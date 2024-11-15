// console.clear();

// let obj = {
//     "name":"Ashok kumar",
//     "my age":12,
//     phoneNo:"9898989898"
// }

// console.log(obj.name);
// console.log(obj["my age"]);
// console.log(obj["phoneNo"]);


// let arr = [
//     {
//         name: "ashok kumar",
//         age: 23,
//         phone: "abs kumar",
//     },
//     {
//         name: "ashok kumar",
//         age: 23,
//         phone: "abs kumar",
//     },
//     {
//         name: "ashok kumar",
//         age: 23,
//         phone: "abs kumar",
//     },
// ]


// let newArr = arr.reduce((acc,item)=>{
//     return acc = [...acc, Object.values(item)]
// },[])

// console.log(newArr);




let data = [
    {
        "id": 6,
        "name": "Aarav bhardwaj",
        "gender": "Male",
        "mobile": 9876543210,
        "dateOfJoining": "2020-01-15",
        "address": "123, Main Street, Delhi",
        "dob": "1990-05-15",
        "designation": "Accountant",
        "email": "aarav.sharma@example.com",
        "staffId": "RWL10926",
        "department": "Dept. of Administration",
        "approver": "RWL97150",
        "active": true,
        "empId": "E001",
        "punchingCode": 10926.00
    },
    {
        "id": 7,
        "name": "Vikram ",
        "gender": "Male",
        "mobile": 9876543211,
        "dateOfJoining": "2019-03-10",
        "address": "456, Park Avenue, Mumbai",
        "dob": "2012-10-16",
        "designation": "Asst. Prof.",
        "email": "vikram.singh@example.com",
        "staffId": "RWL97150",
        "department": "Dept. of Biology",
        "approver": "RWL61900",
        "active": true,
        "empId": "E002",
        "punchingCode": 97150.00
    },
    {
        "id": 8,
        "name": "Neha Gupta",
        "gender": "Female",
        "mobile": 9876543212,
        "dateOfJoining": "2021-06-01",
        "address": "789, Ocean Drive, Chennai",
        "dob": "1992-12-12",
        "designation": "Lecturer",
        "email": "neha.gupta@example.com",
        "staffId": "RWL45757",
        "department": "Dept. of English",
        "approver": "RWL32746",
        "active": true,
        "empId": "E003",
        "punchingCode": 45757.00
    },
    {
        "id": 9,
        "name": "Rahul Verma",
        "gender": "Male",
        "mobile": 9876543213,
        "dateOfJoining": "2022-09-05",
        "address": "321, Sunset Blvd, Kolkata",
        "dob": "1995-11-11",
        "designation": "Sr. Lecturer",
        "email": "rahul.verma@example.com",
        "staffId": "RWL43642",
        "department": "Dept. of Maths",
        "approver": "RWL64754",
        "active": true,
        "empId": "E004",
        "punchingCode": 43642.00
    },
    {
        "id": 10,
        "name": "Simran Kaur",
        "gender": "Female",
        "mobile": 9876543214,
        "dateOfJoining": "2023-02-20",
        "address": "654, Green Park, Hyderabad",
        "dob": "1998-07-07",
        "designation": "Asst. Professor",
        "email": "simran.kaur@example.com",
        "staffId": "RWL42673",
        "department": "Dept of Admission",
        "approver": "RWL61900",
        "active": true,
        "empId": "E005",
        "punchingCode": 42673.00
    },
    {
        "id": 11,
        "name": "Aanya Bhatia",
        "gender": "Female",
        "mobile": 9876543216,
        "dateOfJoining": "2021-04-15",
        "address": "555, Hilltop, Pune",
        "dob": "1993-09-25",
        "designation": "Asst. Prof.",
        "email": "aanya.bhatia@example.com",
        "staffId": "RWL20990",
        "department": "Dept. of Hindi",
        "approver": "RWL49765",
        "active": true,
        "empId": "E006",
        "punchingCode": 20990.00
    },
    {
        "id": 12,
        "name": "Rajesh Joshi",
        "gender": "Male",
        "mobile": 9876543218,
        "dateOfJoining": "2018-10-10",
        "address": "888, Riverside, Jaipur",
        "dob": "1988-03-30",
        "designation": "Driver",
        "email": "rajesh.joshi@example.com",
        "staffId": "RWL50868",
        "department": "Dept of Admission",
        "approver": "RWL17421",
        "active": true,
        "empId": "E007",
        "punchingCode": 50868.00
    },
    {
        "id": 13,
        "name": "Pooja Mehta",
        "gender": "Female",
        "mobile": 9876543220,
        "dateOfJoining": "2019-11-11",
        "address": "234, Ocean View, Surat",
        "dob": "1990-01-01",
        "designation": "Sr. Lecturer",
        "email": "pooja.mehta@example.com",
        "staffId": "RWL33297",
        "department": "Dept. of Biology",
        "approver": "RWL17421",
        "active": true,
        "empId": "E008",
        "punchingCode": 33297.00
    },
    {
        "id": 14,
        "name": "Karan Kapoor",
        "gender": "Male",
        "mobile": 9876543222,
        "dateOfJoining": "2022-05-20",
        "address": "123, Maple Street, Bangalore",
        "dob": "1995-07-15",
        "designation": "Sr. Lecturer",
        "email": "karan.kapoor@example.com",
        "staffId": "RWL54881",
        "department": "Dept. of Physics",
        "approver": null,
        "active": true,
        "empId": "E009",
        "punchingCode": 54881.00
    },
    {
        "id": 15,
        "name": "Sneha Nair",
        "gender": "Female",
        "mobile": 9876543224,
        "dateOfJoining": "2020-08-08",
        "address": "777, Desert Road, Ahmedabad",
        "dob": "1991-06-18",
        "designation": "Sr. Lecturer",
        "email": "sneha.nair@example.com",
        "staffId": "RWL28991",
        "department": "Dept. of English",
        "approver": "RWL33297",
        "active": true,
        "empId": "E010",
        "punchingCode": 28991.00
    },
    {
        "id": 16,
        "name": "Anjali Singh",
        "gender": "Female",
        "mobile": 9876543226,
        "dateOfJoining": "2023-01-10",
        "address": "456, Green Valley, Mumbai",
        "dob": "1992-04-12",
        "designation": "Accountant",
        "email": "anjali.singh@example.com",
        "staffId": "RWL78024",
        "department": "Dept. of Administration",
        "approver": "RWL17421",
        "active": true,
        "empId": "E011",
        "punchingCode": 78024.00
    },
    {
        "id": 17,
        "name": "Vishal raw",
        "gender": "Male",
        "mobile": 9876543228,
        "dateOfJoining": "2019-06-25",
        "address": "321, Hill Crest, Delhi",
        "dob": "1985-11-20",
        "designation": "Security Guard",
        "email": "vikram.sharma@example.com",
        "staffId": "RWL61900",
        "department": "Dept of Admission",
        "approver": "RWL32746",
        "active": true,
        "empId": "E012",
        "punchingCode": 61900.00
    },
    {
        "id": 18,
        "name": "Nisha Reddy",
        "gender": "Female",
        "mobile": 9876543230,
        "dateOfJoining": "2021-09-09",
        "address": "999, Lakeview, Hyderabad",
        "dob": "1990-05-05",
        "designation": "Lecturer",
        "email": "nisha.reddy@example.com",
        "staffId": "RWL17421",
        "department": "Dept. of English",
        "approver": "RWL97150",
        "active": true,
        "empId": "E013",
        "punchingCode": 17421.00
    },
    {
        "id": 19,
        "name": "Rahul Desai",
        "gender": "Male",
        "mobile": 9876543232,
        "dateOfJoining": "2022-02-15",
        "address": "678, City Center, Pune",
        "dob": "1995-08-30",
        "designation": "Sr. Lecturer",
        "email": "rahul.desai@example.com",
        "staffId": "RWL32746",
        "department": "Dept. of Maths",
        "approver": "RWL64754",
        "active": true,
        "empId": "E014",
        "punchingCode": 32746.00
    },
    {
        "id": 20,
        "name": "Sita Iyer",
        "gender": "Female",
        "mobile": 9876543234,
        "dateOfJoining": "2020-03-18",
        "address": "222, Ocean Drive, Chennai",
        "dob": "1993-10-10",
        "designation": "Asst. Prof.",
        "email": "sita.iyer@example.com",
        "staffId": "RWL29863",
        "department": "Dept. of Fine Arts",
        "approver": "RWL50868",
        "active": true,
        "empId": "E015",
        "punchingCode": 29863.00
    },
]


// let newData = data.map((item) => (
//     item.name
// ))

// console.log(newData);

let arr = [1, 2, 2, 4, 5, 7, 8, 0]

let newArr = arr.filter(item => item > 5)

console.log(newArr);
