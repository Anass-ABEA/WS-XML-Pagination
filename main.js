const express = require('express');
const xml2js = require('xml2js');
const xmlbuilder = require('xmlbuilder');
const bodyParser = require('body-parser')

const app = express();
const port = 3000;

let projects = [
    {id: "P1", name : "Project 1"},
    {id: "P2", name : "Project 2"},
    {id: "P3", name : "Project 3"},
    {id: "P4", name : "Project 4"},
    {id: "P5", name : "Project 5"}
]

let access = [
    {id: "A1", name : "Read Users"},
    {id: "A2", name : "Write Users"},
    {id: "A3", name : "Read Sales"},
    {id: "A4", name : "Receipts generation"},
    {id: "A5", name : "Data extraction"}
]

let doors = [
    {Id: "P1", name : "Project 1"},
    {Id: "P2", name : "Project 2"},
    {Id: "P3", name : "Project 3"},
    {Id: "P4", name : "Project 4"},
    {Id: "P5", name : "Project 5"}
]

let time_slots = [
    {id: "S001", names : "09"},
    {id: "S002", names : "Weekends"},
    {id: "S003", names : "work week"},
    {id: "S101", names : "Mornings"},
    {id: "S012", names : "Nights"}
]

let flat_users = [
    {id: 3, displayName: 'Alice Johnson', access: [
        {project: "P1",access: "A1"},
        {project: "P1",access: "A2"},
        {project: "P1",access: "A3"},
        {project: "P2",access: "A0"},
        {project: "P3",access: "A5"}
    ], doors: [
        {door: "D1",slot: "S001"},
        {door: "D1",slot: "S002"},
        {door: "D2",slot: "S101"},
        {door: "D3",slot: "S011"}
    ]
},
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
    {id: 30, displayName: 'Ben Emerald'}
]

const flat_users_copy = {...flat_users};

// Sample user data
let users = [
    {
        id: 1, displayName: 'John Doe', AuthorisationOnline: {
            EntranceGroupAuthorisation: [
                {id: 1234, enabled: true, entranceGroupId: 452, dateTimeScheduleId: [390, 421]},
                {id: 1222, enabled: true, entranceGroupId: 802, dateTimeScheduleId: 421}
            ]
        }
    },
    {
        id: 2, displayName: 'Jane Smith', AuthorisationOnline: {
            EntranceGroupAuthorisation: [
                {id: 1111, enabled: true, entranceGroupId: 802, dateTimeScheduleId: 390},
                {id: 3333, enabled: true, entranceGroupId: 452, dateTimeScheduleId: 421}
            ]
        }
    },
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
    {id: 30, displayName: 'Ben Emerald'}
];

const usrCopy = {...users};

const dayTimeSchedules = [
    {id: 421, name: "Permanent", description: "24/7"},
    {id: 390, name: "MONTAIGNE HORAIRES DE BUREAU", description: "Lundi au vendredi - 5H45 à 20H45 jours ouvrés"},
];
const entranceGroups = [
    {id: 802, name: "GA-CADE - LOCAL VELO", entranceIdList: [1533]},
    {
        id: 452,
        name: "GA-CADE BUREAU DOSSIERS MEDICAUX",
        description: "ET.6 BUREAU DOSSIERS MEDICAUX",
        entranceIdList: [1524, 1528, 1529, 1534, 2156]
    },
];
const entrances = [
    {id:1533, name:"Hello 1553"},
    {id:1524, name:"Hello 1524"},
    {id:1528, name:"Hello 1528"},
    {id:1529, name:"Hello 1529"},
    {id:2156, name:"Hello 2156"},
]

// Middleware to set response header for XML
app.use((req, res, next) => {
    res.setHeader('Content-Type', 'application/xml');
    next();
});
app.use(bodyParser.text({type: "application/xml"}))
app.use(bodyParser.text({type: "text/xml"}))
app.use(bodyParser.json())

function returnObjectListResult(parentXml, valueXml, list, res) {
    const responseXml = xmlbuilder.create(parentXml)
        .ele('data')

    if (list.length > 0) {
        responseXml.ele(list.map(element => ({
            [valueXml]: element
        })));
    }

    res.set('Content-Type', 'application/xml');
    res.send(responseXml.end({pretty: true}));
}

function returnObjectResult(parentXml, valueXml, element, res) {
    const responseXml = xmlbuilder.create(parentXml)
        .ele('data')
        responseXml.ele({
            [valueXml]: element
        });

    res.set('Content-Type', 'application/xml');
    res.send(responseXml.end({pretty: true}));
}

function retrurnUsersResult(pageSize, currentPage, res) {
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
            User: user
        })));
    }

    res.set('Content-Type', 'application/xml');
    res.send(responseXml.end({pretty: true}));
}

// GET /users?currentPage=1&pageSize=2
app.get('/users', (req, res) => {
    const currentPage = parseInt(req.query.currentPage, 10) || 1;
    const pageSize = parseInt(req.query.pageSize, 10) || 10;

    retrurnUsersResult(pageSize, currentPage, res);
});

// POST endpoint to get paginated users with parameters in XML body
app.post('/users', (req, res) => {
    const xmlBody = req.body;
    console.log("body", xmlBody);
    xml2js.parseString(xmlBody, (err, result) => {
        if (err) {
            res.status(400).send('Invalid XML : ' + err);
            return;
        }
        const pageInfo = result['params']['body'][0]['pageInfo'][0];
        const pageSize = parseInt(pageInfo['size'][0], 10) || 10;
        const currentPage = parseInt(pageInfo['page'][0], 10) || 1;

        retrurnUsersResult(pageSize, currentPage, res);
    });
});

// POST endpoint to get paginated users with parameters in XML body
app.post('/users/dtd', (req, res) => {
    const xmlBody = req.body;

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

        retrurnUsersResult(pageSize, currentPage, res);
    });
});

// POST endpoint to get paginated users with parameters in XML body
app.post('/users/json', (req, res) => {
    const result = req.body;
    console.log("body", result);
    const pageInfo = result['params']['body']['pageInfo'];
    const pageSize = parseInt(pageInfo['size'], 10) || 10;
    const currentPage = parseInt(pageInfo['page'], 10) || 1;
    retrurnUsersResult(pageSize, currentPage, res);
});

// GET /users/:id
app.get('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id, 10);
    const user = users.find(u => u.id === userId);
    if (user) {
        const responseXml = xmlbuilder.create('UserResponse')
            .ele({
                User: user
            })
            .end({pretty: true});

        res.send(responseXml);
    } else {
        const errorXml = xmlbuilder.create('ErrorResponse')
            .ele('error', 'User not found')
            .end({pretty: true});

        res.status(404).send(errorXml);
    }
});


// GET /users/:id/addEntrance
app.post('/users/:id/addEntrance', (req, res) => {
    const userId = parseInt(req.params.id, 10);
    const user = users.find(u => u.id === userId);

    if (!user) {
        const errorXml = xmlbuilder.create('ErrorResponse')
            .ele('error', 'User not found')
            .end({pretty: true});

        res.status(404).send(errorXml);
        return;
    }

    if (!user.AuthorisationOnline) {
        user.AuthorisationOnline = {}
    }
    if (!user.AuthorisationOnline.EntranceGroupAuthorisation) {
        user.AuthorisationOnline.EntranceGroupAuthorisation = []
    }

    const xmlBody = req.body;
    console.log("body", xmlBody);
    xml2js.parseString(xmlBody, (err, result) => {
        if (err) {
            res.status(400).send('Invalid XML : ' + err);
            return;
        }
        const entranceGroupId = result.data.EntranceGroupAuthorisation[0].EntranceId[0];
        const dateTimeScheduleId = result.data.EntranceGroupAuthorisation[0].DateTimeScheduleId;
        const id = parseInt(Math.random() * 1000, 10);
        const permissions = {
            id, entranceGroupId, dateTimeScheduleId, enabled: true
        }
        user.AuthorisationOnline.EntranceGroupAuthorisation.push(permissions);
        console.log(JSON.stringify(user));
        returnObjectResult("UserData", "User", user, res);
    });

});

// GET /entranceGroups
app.get('/entranceGroups', (req, res) => {
    returnObjectListResult("EntranceGroupList", "EntranceGroup", entranceGroups, res);
});

// GET /entranceGroups
app.get('/dayTimeShedules', (req, res) => {
    returnObjectListResult("DayTimeScheduleList", "DayTimeSchedule", dayTimeSchedules, res);
});

// GET /entranceGroups
app.get('/entrances', (req, res) => {
    returnObjectListResult("EntranceList", "Entrance", entrances, res);
});

// GET /reset
app.get('/reset', (req, res) => {
    users = {...usrCopy};
    res.status(200).send();
});



// GET /reset
app.get('/beta/reset', (req, res) => {
    flat_users = {...flat_users_copy};
    res.status(200).send();
});

app.post('/beta/users', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    const result = req.body;
    const pageInfo = result['params']['body']['pageInfo'];
    const pageSize = parseInt(pageInfo['size'], 10) || 10;
    const currentPage = parseInt(pageInfo['page'], 10) || 1;
    
    const startIndex = (currentPage - 1) * pageSize;
    let paginatedUsers = [];
    if (startIndex < flat_users.length) {
        paginatedUsers = flat_users.slice(startIndex, startIndex + pageSize);
    }
    res.status(200).send(paginatedUsers);
});

app.post('/beta/projects', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    const result = req.body;
    const pageInfo = result['params']['body']['pageInfo'];
    const pageSize = parseInt(pageInfo['size'], 10) || 10;
    const currentPage = parseInt(pageInfo['page'], 10) || 1;
    
    const startIndex = (currentPage - 1) * pageSize;
    let paginatedUsers = [];
    if (startIndex < projects.length) {
        paginatedUsers = projects.slice(startIndex, startIndex + pageSize);
    }
    res.status(200).send(paginatedUsers);
});



app.post('/beta/access', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    const result = req.body;
    const pageInfo = result['params']['body']['pageInfo'];
    const pageSize = parseInt(pageInfo['size'], 10) || 10;
    const currentPage = parseInt(pageInfo['page'], 10) || 1;
    
    const startIndex = (currentPage - 1) * pageSize;
    let paginatedUsers = [];
    if (startIndex < access.length) {
        paginatedUsers = access.slice(startIndex, startIndex + pageSize);
    }
    res.status(200).send(paginatedUsers);
});




app.post('/beta/doors', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    const result = req.body;
    const pageInfo = result['params']['body']['pageInfo'];
    const pageSize = parseInt(pageInfo['size'], 10) || 10;
    const currentPage = parseInt(pageInfo['page'], 10) || 1;
    
    const startIndex = (currentPage - 1) * pageSize;
    let paginatedUsers = [];
    if (startIndex < doors.length) {
        paginatedUsers = doors.slice(startIndex, startIndex + pageSize);
    }
    res.status(200).send(paginatedUsers);
});



app.post('/beta/timeslots', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    const result = req.body;
    const pageInfo = result['params']['body']['pageInfo'];
    const pageSize = parseInt(pageInfo['size'], 10) || 10;
    const currentPage = parseInt(pageInfo['page'], 10) || 1;
    
    const startIndex = (currentPage - 1) * pageSize;
    let paginatedUsers = [];
    if (startIndex < time_slots.length) {
        paginatedUsers = time_slots.slice(startIndex, startIndex + pageSize);
    }
    res.status(200).send(paginatedUsers);
});


app.post('/beta/users/:id/addProjectAccess', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    const userId = parseInt(req.params.id, 10);
    const user = flat_users.find(u => u.id === userId);

    if (!user) {
        res.status(404).send({error: "User Not found"});
        return;
    }

    if (!user.access) {
        user.access = []
    }
    

    const {project, access} = req.body;
    user.access.add({project, access})
   
    res.status(200).send(user);
});


app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
