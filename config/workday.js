const express = require('express');
const router = express.Router();

const rawEmployees = require('./employees.json');
const employees = [...rawEmployees];

function formatDateDDMMYYYY(date) {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}${month}${year}`;
}

function generateStartDate(seed) {
  const startYear = 2015 + Math.floor(Math.random() * 12);
  const startMonth = Math.floor(Math.random() * 12);
  const startDay = Math.floor(Math.random() * 28) + 1;
  return new Date(startYear, startMonth, startDay);
}

function generateEndDate(startDate, seed) {
  const hasEndDate = Math.random() > 0.4;
  
  if (!hasEndDate) {
    return null;
  }
  
  const endYear = startDate.getFullYear() + Math.floor(Math.random() * 8);
  const endMonth = Math.floor(Math.random() * 12);
  const endDay = Math.floor(Math.random() * 28) + 1;
  
  const endDate = new Date(endYear, endMonth, endDay);
  
  if (endDate <= startDate) {
    return new Date(startDate.getTime() + Math.floor(Math.random() * (365 * 4)) * 86400000);
  }
  
  return endDate;
}

if (rawEmployees.length === 50) {
  const baseCount = rawEmployees.length;
  for (let i = 0; i < baseCount; i += 1) {
    const base = rawEmployees[i];
    const nextId = base.id + baseCount;
    const nextFirst = base.firstName;
    const nextLast = base.lastName;
    const startDate = generateStartDate(nextId);
    const endDate = generateEndDate(startDate, nextId);
    const nextEmployee = {
      ...base,
      id: nextId,
      employeeNumber: `EMP-${nextId}`,
      displayName: `${nextFirst} ${nextLast} Jr`,
      email: `${nextFirst.toLowerCase()}.${nextLast.toLowerCase()}${nextId}@example.com`,
      workEmail: `${nextFirst.toLowerCase()}.${nextLast.toLowerCase()}${nextId}@company.com`,
      mobilePhone: `+1-555-${String(1500 + i).padStart(4, '0')}`,
      officePhone: `+1-555-${String(2500 + i).padStart(4, '0')}`,
      nationality: base.country === 'USA' ? 'Canada' : base.country,
      city: base.city === 'New York' ? 'Toronto' : base.city,
      location: base.location.includes('Office') ? base.location.replace('Office', 'Branch') : base.location,
      startDate: formatDateDDMMYYYY(startDate),
      endDate: endDate ? formatDateDDMMYYYY(endDate) : null,
      customAttributes: {
        ...base.customAttributes,
        badgeId: `B-${nextId}`,
        emergencyPhone: `+1-555-${String(3500 + i).padStart(4, '0')}`
      }
    };
    employees.push(nextEmployee);
  }
}

employees.forEach(emp => {
  if (!emp.startDate) {
    const startDate = generateStartDate(emp.id);
    emp.startDate = formatDateDDMMYYYY(startDate);
    const endDate = generateEndDate(startDate, emp.id);
    emp.endDate = endDate ? formatDateDDMMYYYY(endDate) : null;
  }
});

const employeeSummaries = employees.map(emp => ({
  id: emp.id,
  employeeNumber: emp.employeeNumber,
  displayName: emp.displayName,
  firstName: emp.firstName,
  lastName: emp.lastName,
  email: emp.email,
  department: emp.department,
  jobTitle: emp.jobTitle,
  managerId: emp.managerId,
  managerName: emp.managerName,
  location: emp.location,
  status: emp.status
}));

const employeeDetailsById = employees.reduce((map, emp) => {
  map[emp.id] = emp;
  return map;
}, {});

function parseOffsetLimit(req) {
  const offset = Number.parseInt(req.query.offset, 0);
  const limit = Number.parseInt(req.query.limit, 10);
  return {
    offset: Number.isFinite(offset) && offset >= 0 ? offset : 0,
    limit: Number.isFinite(limit) && limit > 0 ? Math.min(limit, 20) : 20
  };
}

router.get('/employees', (req, res) => {
  const { offset, limit } = parseOffsetLimit(req);
  const paged = employeeSummaries.slice(offset, offset + limit);
  res.json({
    offset,
    limit,
    total: employeeSummaries.length,
    count: paged.length,
    employees: paged
  });
});

router.get('/employees/:id', (req, res) => {
  const employeeId = parseInt(req.params.id, 10);
  const employee = employeeDetailsById[employeeId];
  if (!employee) {
    return res.status(404).json({ error: 'Employee not found' });
  }
  res.json(employee);
});

router.post('/employees/rotate-manager/:id', (req, res) => {
  const employeeId = parseInt(req.params.id, 10);
  const employee = employeeDetailsById[employeeId];

  if (!employee) {
    return res.status(404).json({ error: 'Employee not found' });
  }

  const payload = req.body || {};

  if (payload.rotateManager === true) {
    const randomEmployee = employees[Math.floor(Math.random() * employees.length)];
    if (randomEmployee.id !== employeeId) {
      employee.managerId = randomEmployee.id;
      employee.managerName = randomEmployee.displayName;
    }
  } else {
    if (payload.managerId !== undefined) {
      employee.managerId = payload.managerId;
    }
    if (payload.managerName !== undefined) {
      employee.managerName = payload.managerName;
    }
  }

  if (payload.department !== undefined) {
    employee.department = payload.department;
  }

  const employeeSummary = employeeSummaries.find(emp => emp.id === employeeId);
  if (employeeSummary) {
    employeeSummary.department = employee.department;
    employeeSummary.managerId = employee.managerId;
    employeeSummary.managerName = employee.managerName;
  }

  res.json(employee);
});


module.exports = router;
