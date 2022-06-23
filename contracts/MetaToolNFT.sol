// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract MetaToolNFT is ERC721, ERC721URIStorage {
    uint256 public id;
    mapping(address => uint256) public ownedNft;

    constructor() ERC721("MetaToolNFT", "MTN") {}

    function mintOrUpdate(string memory uri) public {
        uint256 ownedId = ownedNft[msg.sender];
        if (ownedId == 0) {
            id++;
            _safeMint(msg.sender, id);
            _setTokenURI(id, uri);
            ownedNft[msg.sender] = id;
        } else {
            _setTokenURI(ownedId, uri);
        }
    }

    function _burn(uint256 tokenId)
        internal
        override(ERC721, ERC721URIStorage)
    {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }
}
