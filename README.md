# Paprika Studio Time Logger

A blockchain-based employee time logging system powered by Verax Attestation Registry on Linea. This system enables employees to record their working hours securely and immutably through QR code scanning.

## Overview

Paprika Studio Time Logger is a decentralized application (dApp) that leverages the Verax Attestation Registry to create tamper-proof records of employee working hours. Each time log is stored as an on-chain attestation, ensuring complete transparency and immutability of work records.

### Verax Integration

The system utilizes Verax's powerful attestation framework:
- **Schema Registry**: Defines the structure of time log data
- **Portal System**: Manages the submission of time log attestations
- **On-chain Storage**: All records are stored immutably on the Linea blockchain
- **Verifiable Proofs**: Each time log can be independently verified

## Features

- **QR Code Scanning**: Employees can easily log their time by scanning job-specific QR codes
- **Blockchain Attestations**: All time logs are stored as attestations on the Verax registry
- **Secure Authentication**: Wallet-based authentication for employees and administrators
- **Real-time Verification**: Instant verification of time logs through blockchain
- **Administrative Dashboard**: Management interface for overseeing employee time records

## Technical Architecture

### Components

1. **Frontend Application**
   - Next.js web application
   - Web3 wallet integration
   - QR code scanning capabilities
   - Administrative dashboard

2. **Smart Contracts**
   - Verax Attestation Registry integration
   - Custom schema for time logging
   - Portal for attestation submission

3. **Blockchain Infrastructure**
   - Network: Linea Mainnet
   - Registry: Verax Attestation Registry
   - Data Structure: On-chain attestations

### Schema Structure

solidity
(
string employeeId, // Employee identifier
string jobId, // Job/task identifier
uint256 timestamp, // Time of action
string action // "start" or "end"
)



### Verax Components
- Schema Registry for data structure
- Portal for attestation submission
- On-chain attestations for time records

## Usage

### Admin Flow
1. Connect wallet to Linea
2. Create time logging schema
3. Deploy attestation portal
4. Monitor employee records

### Employee Flow
1. Connect wallet
2. Scan QR code at start
3. Scan QR code at end
4. View attestation history

