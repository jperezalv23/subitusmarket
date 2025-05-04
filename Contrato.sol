// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SkillMatchJob {

    address public owner;

    struct Job {
        address client;
        address worker;
        uint256 amount;
        uint256 deadline;
        uint256 createdAt;
        bool isPaid;
        bool workConfirmed;
    }

    mapping(uint256 => Job) public jobs;
    uint256 public jobCount;

    event JobCreated(uint256 jobId, address client, address worker, uint256 amount, uint256 deadline);
    event PaymentReleased(uint256 jobId, address worker, uint256 amount);
    event RefundIssued(uint256 jobId, address client, uint256 amount);
    event ReputationUpdate(address worker, uint256 score);

    modifier onlyClient(uint256 jobId) {
        require(msg.sender == jobs[jobId].client, "Only client can call this");
        _;
    }

    modifier onlyWorker(uint256 jobId) {
        require(msg.sender == jobs[jobId].worker, "Only worker can call this");
        _;
    }

    modifier jobExists(uint256 jobId) {
        require(jobs[jobId].client != address(0), "Job does not exist");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    // Crear un nuevo trabajo pagando con AVAX
    function createJob(address _worker, uint256 _deadlineDays) external payable {
        require(msg.value > 0, "Must send AVAX as payment");

        uint256 jobId = jobCount++;
        uint256 deadline = block.timestamp + (_deadlineDays * 1 days);

        jobs[jobId] = Job({
            client: msg.sender,
            worker: _worker,
            amount: msg.value,
            deadline: deadline,
            createdAt: block.timestamp,
            isPaid: false,
            workConfirmed: false
        });

        emit JobCreated(jobId, msg.sender, _worker, msg.value, deadline);
    }

    function confirmWork(uint256 jobId) external onlyWorker(jobId) jobExists(jobId) {
        require(!jobs[jobId].workConfirmed, "Work already confirmed");
        jobs[jobId].workConfirmed = true;
    }

    function confirmWorkDone(uint256 jobId) external onlyClient(jobId) jobExists(jobId) {
        Job storage job = jobs[jobId];
        require(!job.isPaid, "Payment already released");
        require(job.workConfirmed, "Work not confirmed");

        job.isPaid = true;

        (bool success, ) = payable(job.worker).call{value: job.amount}("");
        require(success, "Payment transfer failed");

        emit PaymentReleased(jobId, job.worker, job.amount);
        emit ReputationUpdate(job.worker, 1); // dummy reputation
    }

    function requestRefund(uint256 jobId) external onlyClient(jobId) jobExists(jobId) {
        Job memory job = jobs[jobId];
        require(block.timestamp > job.deadline, "Deadline not reached");
        require(!job.workConfirmed, "Work already confirmed");

        uint256 refundAmount = job.amount;
        delete jobs[jobId];

        (bool success, ) = payable(job.client).call{value: refundAmount}("");
        require(success, "Refund transfer failed");

        emit RefundIssued(jobId, job.client, refundAmount);
    }
}
