const fs = require('fs');
const path = require('path');
const file = path.resolve(__dirname, 'employees.json');
const employees = JSON.parse(fs.readFileSync(file, 'utf8'));
const startCount = employees.length;
if (startCount !== 50) {
  console.error('Expected 50 employees before doubling, found', startCount);
  process.exit(1);
}
const newEmployees = [];
for (let i = 0; i < employees.length; i++) {
  const base = employees[i];
  const nextId = base.id + 50;
  const nextEmployeeNumber = `EMP-${nextId}`;
  const nextFirst = base.firstName;
  const nextLast = base.lastName;
  const nextDisplay = `${nextFirst} ${nextLast} Jr`;
  const nextEmail = `${nextFirst.toLowerCase()}.${nextLast.toLowerCase()}${nextId}@example.com`;
  const nextWorkEmail = `${nextFirst.toLowerCase()}.${nextLast.toLowerCase()}${nextId}@company.com`;
  const nextBadge = `B-${nextId}`;
  const nextMobile = `+1-555-${String(1500 + i).padStart(4, '0')}`;
  const nextOffice = `+1-555-${String(2500 + i).padStart(4, '0')}`;
  const nextEmergency = `+1-555-${String(3500 + i).padStart(4, '0')}`;
  const nextCountry = base.country === 'USA' ? 'Canada' : base.country;
  const nextCity = base.city === 'New York' ? 'Toronto' : base.city;
  const nextLocation = base.location.includes('Office') ? base.location.replace('Office', 'Branch') : base.location;
  const clone = {
    ...base,
    id: nextId,
    employeeNumber: nextEmployeeNumber,
    displayName: nextDisplay,
    email: nextEmail,
    workEmail: nextWorkEmail,
    mobilePhone: nextMobile,
    officePhone: nextOffice,
    nationality: nextCountry,
    city: nextCity,
    location: nextLocation,
    customAttributes: {
      ...base.customAttributes,
      badgeId: nextBadge,
      emergencyPhone: nextEmergency
    }
  };
  newEmployees.push(clone);
}
const final = [...employees, ...newEmployees];
fs.writeFileSync(file, JSON.stringify(final, null, 2), 'utf8');
console.log('Wrote', final.length, 'employees');
