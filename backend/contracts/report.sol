// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract ReportChain {
    event NewReport(address indexed reporter, string message, uint256 timestamp);

    struct Report {
        address reporter;
        string message;
        uint256 timestamp;
    }

    Report[] public reports;

    function submitReport(string memory _message) public {
        reports.push(Report(msg.sender, _message, block.timestamp));
        emit NewReport(msg.sender, _message, block.timestamp);
    }

    function getReports() public view returns (Report[] memory) {
        return reports;
    }
}
