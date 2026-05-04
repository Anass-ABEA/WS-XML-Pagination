const express = require('express');
const { randomUUID } = require('crypto');
const router = express.Router();

const users = [
  { Id: randomUUID(), Name: 'Alice Johnson', Email: 'alice.johnson@example.com', Location: 'New York', Country: 'US', Status: 'Active', GroupIds: [], AccountIds: [] },
  { Id: randomUUID(), Name: 'Bob Brown', Email: 'bob.brown@example.com', Location: 'San Francisco', Country: 'US', Status: 'Active', GroupIds: [], AccountIds: [] },
  { Id: randomUUID(), Name: 'Carmen Lee', Email: 'carmen.lee@example.com', Location: 'Chicago', Country: 'US', Status: 'Active', GroupIds: [], AccountIds: [] },
  { Id: randomUUID(), Name: 'David Clark', Email: 'david.clark@example.com', Location: 'London', Country: 'GB', Status: 'Active', GroupIds: [], AccountIds: [] },
  { Id: randomUUID(), Name: 'Emma Patel', Email: 'emma.patel@example.com', Location: 'Toronto', Country: 'CA', Status: 'Active', GroupIds: [], AccountIds: [] },
  { Id: randomUUID(), Name: 'Frank Wang', Email: 'frank.wang@example.com', Location: 'Berlin', Country: 'DE', Status: 'Active', GroupIds: [], AccountIds: [] },
  { Id: randomUUID(), Name: 'Grace Kim', Email: 'grace.kim@example.com', Location: 'Sydney', Country: 'AU', Status: 'Active', GroupIds: [], AccountIds: [] },
  { Id: randomUUID(), Name: 'Harold Davis', Email: 'harold.davis@example.com', Location: 'Dublin', Country: 'IE', Status: 'Active', GroupIds: [], AccountIds: [] },
  { Id: randomUUID(), Name: 'Iris Thompson', Email: 'iris.thompson@example.com', Location: 'Boston', Country: 'US', Status: 'Active', GroupIds: [], AccountIds: [] },
  { Id: randomUUID(), Name: 'Jason Rivera', Email: 'jason.rivera@example.com', Location: 'Amsterdam', Country: 'NL', Status: 'Active', GroupIds: [], AccountIds: [] }
];

const groups = [
  { Id: randomUUID(), Name: 'Basic Permissions', Description: 'Read access for assigned accounts.', Permissions: ['Read assigned accounts'] },
  { Id: randomUUID(), Name: 'Account Viewer', Description: 'View account details and assigned opportunities.', Permissions: ['View accounts', 'View opportunities'] },
  { Id: randomUUID(), Name: 'Sales Representative', Description: 'Sales team members who can manage their own accounts.', Permissions: ['View accounts', 'Edit own accounts', 'Create opportunities'] },
  { Id: randomUUID(), Name: 'Sales Manager', Description: 'Sales managers who oversee a team and their accounts.', Permissions: ['View team accounts', 'Approve quotes'] },
  { Id: randomUUID(), Name: 'Finance Analyst', Description: 'Finance users who can review revenue and billing.', Permissions: ['View billing', 'View revenue reports'] },
  { Id: randomUUID(), Name: 'Customer Success', Description: 'Customer success team for account health and retention.', Permissions: ['View customer accounts', 'Update support notes'] },
  { Id: randomUUID(), Name: 'Partner Operations', Description: 'Partner operations team for partner account support.', Permissions: ['View partner accounts', 'Manage partner relationships'] },
  { Id: randomUUID(), Name: 'Marketing Coordinator', Description: 'Marketing users handling campaigns and lead information.', Permissions: ['View campaign metrics', 'Create campaign tasks'] },
  { Id: randomUUID(), Name: 'Product Management', Description: 'Product team members reviewing account feedback and requirements.', Permissions: ['View account feedback', 'Create product requests'] },
  { Id: randomUUID(), Name: 'Executive Leadership', Description: 'Executive access for overview reporting and strategy.', Permissions: ['View executive dashboards', 'View strategic accounts'] },
  { Id: randomUUID(), Name: 'Compliance Review', Description: 'Compliance and audit team for account policy checks.', Permissions: ['View compliance status', 'Flag accounts'] },
  { Id: randomUUID(), Name: 'Security Team', Description: 'Security team for monitoring account access and risks.', Permissions: ['View access logs', 'Manage security alerts'] },
  { Id: randomUUID(), Name: 'Billing Services', Description: 'Billing team for account invoices and payment status.', Permissions: ['View invoices', 'Update payment status'] },
  { Id: randomUUID(), Name: 'Contract Management', Description: 'Contracts team for reviewing and renewing agreements.', Permissions: ['View contracts', 'Request renewals'] },
  { Id: randomUUID(), Name: 'Data Steward', Description: 'Data stewards responsible for account data quality.', Permissions: ['View account data quality', 'Correct account data'] },
  { Id: randomUUID(), Name: 'Reporting Users', Description: 'Users who can run account and sales reports.', Permissions: ['View reports', 'Export data'] },
  { Id: randomUUID(), Name: 'Operations Support', Description: 'Operations support for day-to-day account coordination.', Permissions: ['View operational tasks', 'Create service tickets'] },
  { Id: randomUUID(), Name: 'Onboarding Team', Description: 'Onboarding group for new account setup and training.', Permissions: ['View onboarding status', 'Update onboarding tasks'] },
  { Id: randomUUID(), Name: 'Executive Assistant', Description: 'Assistants supporting executives with account access.', Permissions: ['View executive accounts', 'Schedule meetings'] },
  { Id: randomUUID(), Name: 'Partner Support', Description: 'Support team handling partner questions and account issues.', Permissions: ['View partner tickets', 'Respond to partner requests'] }
];

const accounts = [
  {
    Id: randomUUID(),
    Name: 'Acme Corp',
    Industry: 'Manufacturing',
    Type: 'Customer',
    OwnerId: users[0].Id,
    BillingCity: 'New York',
    BillingCountry: 'US',
    AnnualRevenue: 12000000,
    Status: 'Active',
    GroupIds: [groups[0].Id, groups[1].Id]
  },
  {
    Id: randomUUID(),
    Name: 'Pinnacle Solutions',
    Industry: 'Technology',
    Type: 'Partner',
    OwnerId: users[1].Id,
    BillingCity: 'San Francisco',
    BillingCountry: 'US',
    AnnualRevenue: 8500000,
    Status: 'Active',
    GroupIds: [groups[2].Id, groups[3].Id]
  },
  {
    Id: randomUUID(),
    Name: 'Greenfield Foods',
    Industry: 'Retail',
    Type: 'Customer',
    OwnerId: users[2].Id,
    BillingCity: 'Chicago',
    BillingCountry: 'US',
    AnnualRevenue: 5300000,
    Status: 'Active',
    GroupIds: [groups[4].Id]
  },
  {
    Id: randomUUID(),
    Name: 'Silverline Bank',
    Industry: 'Financial Services',
    Type: 'Customer',
    OwnerId: users[3].Id,
    BillingCity: 'London',
    BillingCountry: 'GB',
    AnnualRevenue: 24500000,
    Status: 'Active',
    GroupIds: [groups[5].Id, groups[6].Id]
  },
  {
    Id: randomUUID(),
    Name: 'Blue Horizon Media',
    Industry: 'Media',
    Type: 'Customer',
    OwnerId: users[4].Id,
    BillingCity: 'Toronto',
    BillingCountry: 'CA',
    AnnualRevenue: 7200000,
    Status: 'Active',
    GroupIds: [groups[7].Id]
  },
  {
    Id: randomUUID(),
    Name: 'Vertex Logistics',
    Industry: 'Transportation',
    Type: 'Customer',
    OwnerId: users[5].Id,
    BillingCity: 'Berlin',
    BillingCountry: 'DE',
    AnnualRevenue: 16300000,
    Status: 'Active',
    GroupIds: [groups[8].Id, groups[9].Id]
  },
  {
    Id: randomUUID(),
    Name: 'Oceanview Energy',
    Industry: 'Energy',
    Type: 'Prospect',
    OwnerId: users[6].Id,
    BillingCity: 'Sydney',
    BillingCountry: 'AU',
    AnnualRevenue: 19900000,
    Status: 'Prospect',
    GroupIds: [groups[10].Id]
  },
  {
    Id: randomUUID(),
    Name: 'Nexus Healthcare',
    Industry: 'Healthcare',
    Type: 'Customer',
    OwnerId: users[7].Id,
    BillingCity: 'Dublin',
    BillingCountry: 'IE',
    AnnualRevenue: 10150000,
    Status: 'Active',
    GroupIds: [groups[11].Id, groups[12].Id]
  },
  {
    Id: randomUUID(),
    Name: 'Summit Education',
    Industry: 'Education',
    Type: 'Customer',
    OwnerId: users[8].Id,
    BillingCity: 'Boston',
    BillingCountry: 'US',
    AnnualRevenue: 6800000,
    Status: 'Active',
    GroupIds: [groups[13].Id]
  },
  {
    Id: randomUUID(),
    Name: 'Metro Manufacturing',
    Industry: 'Industrial',
    Type: 'Customer',
    OwnerId: users[9].Id,
    BillingCity: 'Amsterdam',
    BillingCountry: 'NL',
    AnnualRevenue: 13200000,
    Status: 'Active',
    GroupIds: [groups[14].Id, groups[15].Id]
  }
];

users.forEach(user => {
  user.AccountIds = [];
});

accounts.forEach(account => {
  const owner = users.find(user => user.Id === account.OwnerId);
  if (owner) {
    owner.AccountIds.push(account.Id);
  }
});

function parsePageMax(req) {
  const page = Number.parseInt(req.headers.page, 10);
  const max = Number.parseInt(req.headers.max, 10);
  return {
    page: Number.isFinite(page) && page > 0 ? page : 1,
    max: Number.isFinite(max) && max > 0 ? Math.min(max, 30) : 20
  };
}

function paginate(list, page, max) {
  const offset = (page - 1) * max;
  return list.slice(offset, offset + max);
}

router.get('/accounts', (req, res) => {
  const { page, max } = parsePageMax(req);
  const data = paginate(accounts, page, max);
  res.json({
    page,
    max,
    total: accounts.length,
    count: data.length,
    accounts: data
  });
});

router.post('/users/:userId/enable', (req, res) => {
  const { userId } = req.params;
  const user = users.find(u => u.Id === userId);

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  user.Status = 'Active';
  res.json(user);
});

router.post('/users/:userId/disable', (req, res) => {
  const { userId } = req.params;
  const user = users.find(u => u.Id === userId);

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  user.Status = 'Inactive';
  res.json(user);
});


router.get('/groups', (req, res) => {
  res.json({ total: groups.length, groups });
});

router.get('/users', (req, res) => {
  const { page, max } = parsePageMax(req);
  const data = paginate(users, page, max);
  res.json({
    page,
    max,
    total: users.length,
    count: data.length,
    users: data
  });
});

router.get('/users/:userId', (req, res) => {
  const { userId } = req.params;
  const user = users.find(u => u.Id === userId);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  res.json(user);
});

router.post('/users', (req, res) => {
  const payload = req.body || {};
  const record = payload.record || payload.User || payload.user || payload;
  const groupIds = payload.GroupIds || payload.groupIds || [];
  const accountIds = payload.AccountIds || payload.accountIds || [];

  if (!record || !record.Name || !record.Email) {
    return res.status(400).json({ error: 'User payload with Name and Email is required.' });
  }

  const invalidGroupIds = groupIds.filter(id => !groups.some(group => group.Id === id));
  if (invalidGroupIds.length > 0) {
    return res.status(400).json({ error: 'Invalid group IDs.', invalidGroupIds });
  }

  const invalidAccountIds = accountIds.filter(id => !accounts.some(account => account.Id === id));
  if (invalidAccountIds.length > 0) {
    return res.status(400).json({ error: 'Invalid account IDs.', invalidAccountIds });
  }

  const newUser = {
    Id: randomUUID(),
    Name: record.Name,
    Email: record.Email,
    Location: record.Location || record.location || 'Unknown',
    Country: record.Country || record.country || 'Unknown',
    Status: record.Status || record.status || 'Active',
    GroupIds: Array.from(new Set(groupIds)),
    AccountIds: []
  };

  accountIds.forEach(accountId => {
    const account = accounts.find(a => a.Id === accountId);
    if (!account) {
      return;
    }

    if (account.OwnerId !== newUser.Id) {
      const previousOwner = users.find(u => u.Id === account.OwnerId);
      if (previousOwner) {
        previousOwner.AccountIds = previousOwner.AccountIds.filter(id => id !== accountId);
      }
      account.OwnerId = newUser.Id;
    }

    if (!newUser.AccountIds.includes(accountId)) {
      newUser.AccountIds.push(accountId);
    }
  });

  users.push(newUser);
  res.status(201).json(newUser);
});

router.post('/users/:userId/groups', (req, res) => {
  const { userId } = req.params;
  const { GroupIds, groupIds } = req.body || {};
  const newGroupIds = GroupIds || groupIds || [];
  const user = users.find(u => u.Id === userId);

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  const invalidGroupIds = newGroupIds.filter(id => !groups.some(group => group.Id === id));
  if (invalidGroupIds.length > 0) {
    return res.status(400).json({ error: 'Invalid group IDs.', invalidGroupIds });
  }

  user.GroupIds = Array.from(new Set([...(user.GroupIds || []), ...newGroupIds]));
  res.json(user);
});

router.post('/users/:userId/accounts', (req, res) => {
  const { userId } = req.params;
  const { AccountIds, accountIds } = req.body || {};
  const newAccountIds = AccountIds || accountIds || [];
  const user = users.find(u => u.Id === userId);

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  const invalidAccountIds = newAccountIds.filter(id => !accounts.some(account => account.Id === id));
  if (invalidAccountIds.length > 0) {
    return res.status(400).json({ error: 'Invalid account IDs.', invalidAccountIds });
  }

  newAccountIds.forEach(accountId => {
    const account = accounts.find(a => a.Id === accountId);
    if (!account) {
      return;
    }

    if (account.OwnerId !== userId) {
      const previousOwner = users.find(u => u.Id === account.OwnerId);
      if (previousOwner) {
        previousOwner.AccountIds = previousOwner.AccountIds.filter(id => id !== accountId);
      }
      account.OwnerId = userId;
    }

    if (!user.AccountIds.includes(accountId)) {
      user.AccountIds.push(accountId);
    }
  });

  user.AccountIds = Array.from(new Set(user.AccountIds));
  res.json(user);
});

router.patch('/users/:userId', (req, res) => {
  const { userId } = req.params;
  const payload = req.body || {};
  const user = users.find(u => u.Id === userId);

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  if (payload.Name) {
    user.Name = payload.Name;
  }
  if (payload.Email) {
    user.Email = payload.Email;
  }
  if (payload.Location) {
    user.Location = payload.Location;
  }
  if (payload.Country) {
    user.Country = payload.Country;
  }
  if (payload.Status) {
    user.Status = payload.Status;
  }

  res.json(user);
});

router.delete('/users/:userId', (req, res) => {
  const { userId } = req.params;
  const userIndex = users.findIndex(u => u.Id === userId);

  if (userIndex === -1) {
    return res.status(404).json({ error: 'User not found' });
  }

  const deletedUser = users.splice(userIndex, 1)[0];
  
  deletedUser.AccountIds.forEach(accountId => {
    const account = accounts.find(a => a.Id === accountId);
    if (account) {
      account.OwnerId = 'Unknown';
    }
  });

  res.json({ message: 'User deleted successfully', deletedUser });
});

module.exports = router;
