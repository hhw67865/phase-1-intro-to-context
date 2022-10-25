function createEmployeeRecord (employee) {
    const employeeRecord = {
        firstName: employee[0],
        familyName: employee[1],
        title: employee[2],
        payPerHour: employee[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    return employeeRecord;
}

function createEmployeeRecords (employeeArray) {
    const employeeRecords = [];
    employeeArray.forEach(employee => {
        employeeRecords.push(createEmployeeRecord(employee));
    });
    return employeeRecords;
}

function createTimeInEvent (employeeRecord, dateStamp) {
    const dateAndHour = dateStamp.split(' ');
    employeeRecord.timeInEvents = [
        {
            type: "TimeIn",
            hour: parseInt(dateAndHour[1],10),
            date: dateAndHour[0]
        }
    ];
    return employeeRecord;
}

function createTimeOutEvent (employeeRecord, dateStamp) {
    const dateAndHour = dateStamp.split(' ');
    employeeRecord.timeOutEvents = [
        {
            type: "TimeOut",
            hour: parseInt(dateAndHour[1],10),
            date: dateAndHour[0]
        }
    ];
    return employeeRecord;
}

function hoursWorkedOnDate (employeeRecord, date) {
    let timeIn = 0;
    let timeOut = 0;
    employeeRecord.timeInEvents.forEach(clockIn => {
        if(Object.values(clockIn).includes(date)) {
            timeIn = clockIn.hour;            
        }
    })
    employeeRecord.timeOutEvents.forEach(clockOut => {
        if(Object.values(clockOut).includes(date)) {
            timeOut = clockOut.hour;            
        }
    })
    return (timeOut - timeIn)/100;
    
}

function wagesEarnedOnDate (employeeRecord, date) {
    return hoursWorkedOnDate(employeeRecord, date) * employeeRecord.payPerHour
}

function allWagesFor (employeeRecord) {
    let wageSum = 0;
    employeeRecord.timeInEvents.forEach(clockIn => {
        wageSum += wagesEarnedOnDate(employeeRecord, clockIn.date);
    })

    return wageSum;
    
}

function calculatePayroll (employeeArray) {
    let payroll=0;
    employeeArray.forEach(employeeRecord => payroll += allWagesFor(employeeRecord))
    return payroll;
}
