// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./usdc.sol";
import "./VehicleDoc.sol";

contract VehicleLoanContract {
    enum OfferStatus { NONE, OPEN, CLOSED }
    enum LoanStatus { NONE, BORROWED, PAID, DEFAULTED }

     mapping(address => uint256) public lenderBalances;  // Track each lender's balance
    mapping(uint256 => address) public offerLenders;   // Track lender for each offer

    struct LendOffer {
        uint256 amount;
        uint256 interest; // in percentage
        uint256 duration; // in days
        OfferStatus status;
    }

    struct Loan {
        uint256 offerId;
        uint256 dueDate;
        uint256 documentTokenId; // ERC721 tokenId for the vehicle document
        LoanStatus status;
    }

    address public lender;
    USDC public usdc;
    VehicleDocument public vehicleDocument;

    mapping(uint256 => LendOffer) public lendOffers;
    uint256 public nextOfferId = 1;
    
    mapping(address => Loan) public loans;

    modifier onlyLender() {
        require(msg.sender == lender, "Only the lender can perform this.");
        _;
    }

    constructor(address _usdc, address _vehicleDocument) {
        lender = msg.sender;
        usdc = USDC(_usdc);
        vehicleDocument = VehicleDocument(_vehicleDocument);
    }

 function createLendOffer(uint256 _amount, uint256 _interest, uint256 _duration) external {
        // Transfer USDC from lender to this contract
        require(usdc.transferFrom(msg.sender, address(this), _amount), "Transfer failed");
        
        // Update the lender's balance in the contract
        lenderBalances[msg.sender] += _amount;

        lendOffers[nextOfferId] = LendOffer({
            amount: _amount,
            interest: _interest,
            duration: _duration,
            status: OfferStatus.OPEN
        });
        
        // Map the offer to the lender
        offerLenders[nextOfferId] = msg.sender;

        nextOfferId++;
    }

     function withdrawExcessUSDC(uint256 amount) external {
        // Ensure the lender is withdrawing only excess funds not tied to open offers
        require(lenderBalances[msg.sender] >= amount, "Not enough funds");
        
        // Reduce the lender's balance in the contract
        lenderBalances[msg.sender] -= amount;

        require(usdc.transfer(msg.sender, amount), "Withdraw failed");
    }

    function borrow(uint256 _offerId, uint256 _tokenId) external {
        require(lendOffers[_offerId].status == OfferStatus.OPEN, "Offer not available.");
        require(vehicleDocument.ownerOf(_tokenId) == msg.sender, "You must own the document NFT to use as collateral.");
        
        uint256 loanAmount = lendOffers[_offerId].amount;
        uint256 dueDate = block.timestamp + (lendOffers[_offerId].duration * 1 days);
        
        vehicleDocument.transferFrom(msg.sender, address(this), _tokenId);  // Transfer the document to the contract as collateral

        loans[msg.sender] = Loan({
            offerId: _offerId,
            dueDate: dueDate,
            documentTokenId: _tokenId,
            status: LoanStatus.BORROWED
        });

        lendOffers[_offerId].status = OfferStatus.CLOSED;
        
        usdc.transfer(msg.sender, loanAmount);  // Transfer the loan amount to borrower
    }

    
}
