pragma solidity >=0.8.0 <0.9.0;
//SPDX-License-Identifier: MIT

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "hardhat/console.sol";
// import "@openzeppelin/contracts/access/Ownable.sol"; 
// https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/access/Ownable.sol

contract Webway is ERC721URIStorage {

    // event EffectEmitted(string _type, );

    struct Effect {
        string _type;
        bool _active;
        string _uri;
        bool init;
    }

    event EffectToggle(string _name,  string _type, bool _active, string _uri);

    event ChangeURI(uint256 _index, string _uri);

    // string[] effectIndex = ['statue1','statue2','skybox1'];

    mapping(string => Effect) effectData;

    uint256 counter;

    constructor(string memory name_, string memory symbol_) ERC721 (name_, symbol_)  {
        _safeMint(msg.sender, counter);
        counter ++;
        changeURI(0, "test");
        _initEffects();
        // init effects
     }

     function mintNewSpace(string memory _uri) public {
         _safeMint(msg.sender, counter);
         changeURI(counter, _uri);
         counter++;
     }

     function _initEffects() internal {
         Effect storage statue = effectData['statue'];
         Effect storage sky = effectData['sky'];
         Effect storage portal = effectData['portal'];
         statue._type = 'object';
         statue._uri = 'statuehash';
         statue.init = true;
         sky._type = 'background';
         sky._uri = 'skyhash';
         sky.init = true;
         portal._type = 'portal';
         portal._uri = 'portalhash';
         portal.init = true;
         toggleEffect('statue');
         toggleEffect('sky');
         toggleEffect('portal');
     }

    function changeURI(uint256 _index, string memory _uri) public {
        _setTokenURI(_index, _uri);
        emit ChangeURI(_index, _uri);
    }

    function toggleEffect(string memory _id) public {
        Effect storage _effect = effectData[_id];
        require(_effect.init == true, "No such effect found");
        _effect._active = !_effect._active;
        emit EffectToggle(_id, _effect._type, _effect._active, _effect._uri);
    }

}
