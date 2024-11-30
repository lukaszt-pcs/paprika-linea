// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

contract PaprikaTimeLogger {
    // Log structure
    struct TimeLog {
        address employee;
        string jobId;
        uint256 timestamp;
        string action; // "start" or "end"
    }

    // Mapping to store logs for each employee
    mapping(address => TimeLog[]) public logs;

    // Event for logging time entries
    event LogTime(address indexed employee, string jobId, uint256 timestamp, string action);

    // Add a time log entry
    function logTime(string memory jobId, string memory action) public {
        require(bytes(action).length > 0, "Action cannot be empty");
        require(
            keccak256(abi.encodePacked(action)) == keccak256(abi.encodePacked("start")) ||
            keccak256(abi.encodePacked(action)) == keccak256(abi.encodePacked("end")),
            "Action must be 'start' or 'end'"
        );

        TimeLog memory newLog = TimeLog({
            employee: msg.sender,
            jobId: jobId,
            timestamp: block.timestamp,
            action: action
        });

        logs[msg.sender].push(newLog);

        emit LogTime(msg.sender, jobId, block.timestamp, action);
    }

    // Retrieve logs for an employee
    function getLogs(address employee) public view returns (TimeLog[] memory) {
        return logs[employee];
    }
}
