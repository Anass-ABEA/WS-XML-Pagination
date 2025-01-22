const express = require('express');
const xml2js = require('xml2js');
const xmlbuilder = require('xmlbuilder');
const bodyParser = require('body-parser')

const app = express();
const port = 3000;

// Sample user data
const users = [
    {id: 1, displayName: 'John Doe'},
    {id: 2, displayName: 'Jane Smith'},
    {id: 3, displayName: 'Alice Johnson'},
    {id: 4, displayName: 'Bob Brown'},
    {id: 5, displayName: 'Eve White'},
    {id: 6, displayName: 'Charlie Green'},
    {id: 7, displayName: 'Diana Blue'},
    {id: 8, displayName: 'Frank Black'},
    {id: 9, displayName: 'Grace Purple'},
    {id: 10, displayName: 'Hank Orange'},
    {id: 11, displayName: 'Isla Red'},
    {id: 12, displayName: 'Jack Yellow'},
    {id: 13, displayName: 'Kara Silver'},
    {id: 14, displayName: 'Liam Gold'},
    {id: 15, displayName: 'Mia Brown'},
    {id: 16, displayName: 'Noah White'},
    {id: 17, displayName: 'Olivia Gray'},
    {id: 18, displayName: 'Paul Indigo'},
    {id: 19, displayName: 'Quinn Teal'},
    {id: 20, displayName: 'Rachel Pink'},
    {id: 21, displayName: 'Sam Magenta'},
    {id: 22, displayName: 'Tina Violet'},
    {id: 23, displayName: 'Uma Aqua'},
    {id: 24, displayName: 'Victor Olive'},
    {id: 25, displayName: 'Wendy Lime'},
    {id: 26, displayName: 'Xander Cyan'},
    {id: 27, displayName: 'Yara Peach'},
    {id: 28, displayName: 'Zane Plum'},
    {id: 29, displayName: 'Amelia Scarlet'},
    {id: 30, displayName: 'Ben Emerald'},
    {id: 31, displayName: 'Clara Sapphire'},
    {id: 32, displayName: 'Derek Ruby'},
    {id: 33, displayName: 'Ellie Jade'},
    {id: 34, displayName: 'Finn Crimson'},
    {id: 35, displayName: 'Gina Amber'},
    {id: 36, displayName: 'Harry Topaz'},
    {id: 37, displayName: 'Ivy Pearl'},
    {id: 38, displayName: 'Jake Onyx'},
    {id: 39, displayName: 'Kylie Quartz'},
    {id: 40, displayName: 'Lola Garnet'},
    {id: 41, displayName: 'Mason Turquoise'},
    {id: 42, displayName: 'Nina Aquamarine'},
    {id: 43, displayName: 'Oscar Opal'},
    {id: 44, displayName: 'Penny Coral'},
    {id: 45, displayName: 'Quincy Cerulean'},
    {id: 46, displayName: 'Ruby Peridot'},
    {id: 47, displayName: 'Sophie Bronze'},
    {id: 48, displayName: 'Thomas Silverstone'},
    {id: 49, displayName: 'Uma Goldstone'},
    {id: 50, displayName: 'Victor Ironstone'}
];

// Middleware to set response header for XML
app.use((req, res, next) => {
    res.setHeader('Content-Type', 'application/xml');
    next();
});
app.use(bodyParser.text({type: "application/xml"}))
app.use(bodyParser.text({type: "text/xml"}))
app.use(bodyParser.json())

function returnTightResult(pageSize, currentPage, res) {
    const startIndex = (currentPage - 1) * pageSize;
    let paginatedUsers = [];
    if (startIndex < users.length) {
        paginatedUsers = users.slice(startIndex, startIndex + pageSize);
    }

    const responseXml = xmlbuilder.create('UsersResponse')
        .ele('users')
        .ele('currentPage', currentPage).up()
        .ele('pageSize', pageSize).up()
        .ele('totalUsers', users.length).up();

    if (paginatedUsers.length > 0) {
        responseXml.ele(paginatedUsers.map(user => ({
            User: {id: user.id, displayName: user.displayName}
        })));
    }

    res.set('Content-Type', 'application/xml');
    res.send(responseXml.end({pretty: true}));
}

function separatedResult(pageSize, currentPage, res) {
    const startIndex = (currentPage - 1) * pageSize;
    let paginatedUsers = [];
    if (startIndex < users.length) {
        paginatedUsers = users.slice(startIndex, startIndex + pageSize);
    }

    const responseXml = xmlbuilder.create('UsersResponse')
        .ele('users')
        .ele('currentPage', currentPage).up()
        .ele('pageSize', pageSize).up()
        .ele('totalUsers', users.length).up();

    if (paginatedUsers.length > 0) {
        responseXml
            .ele('data').ele(paginatedUsers.map(user => ({
            User: {id: user.id, displayName: user.displayName}
        })));
    }

    res.set('Content-Type', 'application/xml');
    res.send(responseXml.end({pretty: true}));
}

// GET /users?currentPage=1&pageSize=2
app.get('/users', (req, res) => {
    const currentPage = parseInt(req.query.currentPage, 10) || 1;
    const pageSize = parseInt(req.query.pageSize, 10) || 10;

    returnTightResult(pageSize, currentPage, res);
});


// POST endpoint to get paginated users with parameters in XML body
app.post('/users', (req, res) => {
    const xmlBody = req.body;
    console.log("query",req.query);
    console.log("body",xmlBody);
    xml2js.parseString(xmlBody, (err, result) => {
        if (err) {
            res.status(400).send('Invalid XML : ' + err);
            return;
        }
        const pageInfo = result['params']['body'][0]['pageInfo'][0];
        const pageSize = parseInt(pageInfo['size'][0], 10) || 10;
        const currentPage = parseInt(pageInfo['page'][0], 10) || 1;

        returnTightResult(pageSize, currentPage, res);
    });
});



// POST endpoint to get paginated users with parameters in XML body
app.post('/users/dtd', (req, res) => {
  const xmlBody = req.body;
  console.log("query",req.query);
  console.log("body",xmlBody);

  const parser = new xml2js.Parser({
    explicitArray: false, // Prevents arrays for single elements
    tagNameProcessors: [xml2js.processors.stripPrefix] // Strips namespace prefixes like `sch:`
  });


  parser.parseString(xmlBody, (err, result) => {
      if (err) {
          res.status(400).send('Invalid XML : ' + err);
          return;
      }
      const pageInfo = result.Envelope.Body.PersonSearchInfo.SearchRange;
      const pageSize = parseInt(pageInfo.nrOfRecords, 10) || 10;
      const currentPage = parseInt(pageInfo.startRecordNo, 10) || 1;

      returnTightResult(pageSize, currentPage, res);
  });
});

// POST endpoint to get paginated users with parameters in XML body
app.post('/users/json', (req, res) => {
    const result = req.body;
    console.log("query",req.query);
    console.log("body",result);
    const pageInfo = result['params']['body']['pageInfo'];
    const pageSize = parseInt(pageInfo['size'], 10) || 10;
    const currentPage = parseInt(pageInfo['page'], 10) || 1;
    returnTightResult(pageSize, currentPage, res);
});

// GET /users?currentPage=1&pageSize=2
app.get('/separated/users', (req, res) => {
    console.log("query",req.query);
    const currentPage = parseInt(req.query.currentPage, 10) || 1;
    const pageSize = parseInt(req.query.pageSize, 10) || 10;

    separatedResult(pageSize, currentPage, res);
});


// POST endpoint to get paginated users with parameters in XML body
app.post('/separated/users', (req, res) => {
    const xmlBody = req.body;
    console.log("query",req.query);
    console.log("body",xmlBody);
    xml2js.parseString(xmlBody, (err, result) => {
        if (err) {
            res.status(400).send('Invalid XML : ' + err);
            return;
        }
        const pageInfo = result['params']['body'][0]['pageInfo'][0];
        const pageSize = parseInt(pageInfo['size'][0], 10) || 10;
        const currentPage = parseInt(pageInfo['page'][0], 10) || 1;

        separatedResult(pageSize, currentPage, res);
    });
});

// POST endpoint to get paginated users with parameters in XML body
app.post('/separated/users/json', (req, res) => {
    const result = req.body;
    console.log("query",req.query);
    console.log("body-res",result);
    const pageInfo = result['params']['body']['pageInfo'];
    const pageSize = parseInt(pageInfo['size'], 10) || 10;
    const currentPage = parseInt(pageInfo['page'], 10) || 1;
    separatedResult(pageSize, currentPage, res);
});

// GET /users/:id
app.get('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id, 10);
    const user = users.find(u => u.id === userId);

    if (user) {
        const responseXml = xmlbuilder.create('UserResponse')
            .ele('User')
            .ele('id', user.id).up()
            .ele('displayName', user.displayName).up()
            .end({pretty: true});

        res.send(responseXml);
    } else {
        const errorXml = xmlbuilder.create('ErrorResponse')
            .ele('error', 'User not found')
            .end({pretty: true});

        res.status(404).send(errorXml);
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
