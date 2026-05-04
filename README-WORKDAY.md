# Workday API Documentation

This repository exposes a small Workday-style employee API under `/workday`.

## Base URL

- `http://localhost:3000/workday`

## Endpoints

### GET /workday/employees

Returns a paginated list of employee summaries.

Query parameters:

- `offset` (optional) - zero-based starting index. Defaults to `0`.
- `limit` (optional) - max number of employees per page. Defaults to `20`, max `20`.

Response shape:

```json
{
  "offset": 0,
  "limit": 20,
  "total": 100,
  "count": 20,
  "employees": [
    {
      "id": 1,
      "employeeNumber": "EMP-1",
      "displayName": "Alice Smith",
      "firstName": "Alice",
      "lastName": "Smith",
      "email": "alice.smith@example.com",
      "department": "Finance",
      "jobTitle": "Analyst",
      "managerId": 10,
      "managerName": "Bob Jones",
      "location": "New York Office",
      "status": "Active"
    }
  ]
}
```

### GET /workday/employees/:id

Returns full employee details for the requested `id`.

Example request:

```http
GET /workday/employees/1
```

Response shape:

```json
{
  "id": 1,
  "employeeNumber": "EMP-1",
  "displayName": "Alice Smith",
  "firstName": "Alice",
  "lastName": "Smith",
  "email": "alice.smith@example.com",
  "workEmail": "alice.smith@company.com",
  "mobilePhone": "+1-555-1500",
  "officePhone": "+1-555-2500",
  "department": "Finance",
  "jobTitle": "Analyst",
  "managerId": 10,
  "managerName": "Bob Jones",
  "location": "New York Office",
  "status": "Active",
  "startDate": "01012024", // startdate format is ddMMyyyy
  "endDate": null,
  "country": "USA",
  "nationality": "American",
  "city": "New York",
  "customAttributes": {
    "badgeId": "B-1",
    "emergencyPhone": "+1-555-3500"
  }
}
```

### GET /workday/employees/rotate-manager/:id

Updates manager and department values for the requested employee (this is only to test the changes! it's usually done by a manager but this API is to simulate an HR changing the data)

Request body example:

```json
{
  "managerId": 10,
  "managerName": "Bob Jones",
  "department": "Finance"
}
```


Request body example 2 (for automatic reassignment):

```json
{
  "rotateManager": true
}
```

Use `"rotateManager": true` to assign a random manager from the employee list.

## Notes

- The API returns employee summary objects for collection requests.
- The full-detail route returns the complete employee record from `config/employees.json`.
- Missing `startDate` and `endDate` values are generated in `DDMMYYYY` format.