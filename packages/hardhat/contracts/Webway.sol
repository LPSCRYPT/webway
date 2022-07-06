pragma solidity >=0.8.0 <0.9.0;
//SPDX-License-Identifier: MIT

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "hardhat/console.sol";
// import "@openzeppelin/contracts/access/Ownable.sol"; 
// https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/access/Ownable.sol

string constant spacea_ipfs = "ipfs://bafkreibpsykg63ru34uwkl3qufgymrk5l2gt6wmjvapb3nqmzyfbnaypvy";

address constant address_a = 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266;

string constant effectAKey = "makeSkyOnFire";
string constant effectAIpfs = "ipfs://bafkreief42ckfa7fbxikb33xqjxmukqkf4lmbq3pk6cclpo6ajrvxf4m6u";
string constant effectBKey = "changeWaterColor";
string constant effectBIpfs = spacea_ipfs;



contract Webway is ERC721URIStorage {

    // event EffectEmitted(string _type, );

    struct Effect {
        uint256 _token_id;
        string _key;
        bool _active;
        string _uri;
        bool init;
    }

    event EffectToggle(uint256 _token_id, string _key, bool _active, string _uri);

    event ChangeURI(uint256 _index, string _uri);

    // string[] effectIndex = ['statue1','statue2','skybox1'];

    // mapping(string => Effect) effectData;
    mapping(uint256 => mapping (string => Effect)) public effectData;

    mapping(string => mapping(address => uint)) public metadataUri;


    uint256 counter;

    constructor(string memory name_, string memory symbol_) ERC721 (name_, symbol_)  {
        _safeMint(address_a, counter);
        changeURI(counter, spacea_ipfs);
        addEffect(counter, effectAIpfs, effectAKey);
        addEffect(counter, effectBIpfs, effectBKey);
        // addEffect(effectBIpfs, effectBKey);
        counter++;

        _safeMint(address_a, counter);
        addEffect(counter, effectAIpfs, effectAKey);
        changeURI(counter, spacea_ipfs);
        counter++;
        // _initEffects();
     }

     function mintNewSpace(string memory _uri) public {
         _safeMint(msg.sender, counter);
         changeURI(counter, _uri);
         counter++;
     }

     function addEffect(uint256 _index, string memory _uri, string memory _key) public {
         require(!effectData[_index][_key].init, "Effect already initialized");
         Effect storage newEffect = effectData[_index][_key];
         newEffect._token_id = _index;
         newEffect._key = _key;
         newEffect._active = false;
         newEffect._uri = _uri;
         newEffect.init = true;
         emit EffectToggle(_index, _key, false, _uri);
     }

    //  function _initEffects() internal {
    //      Effect storage statue = effectData['statue'];
    //      Effect storage sky = effectData['sky'];
    //      Effect storage portal = effectData['portal'];
    //      statue._type = 'object';
    //      statue._uri = 'statuehash';
    //      statue.init = true;
    //      sky._type = 'background';
    //      sky._uri = 'skyhash';
    //      sky.init = true;
    //      portal._type = 'portal';
    //      portal._uri = 'portalhash';
    //      portal.init = true;
    //      toggleEffect('statue');
    //      toggleEffect('sky');
    //      toggleEffect('portal');
    //  }

    function changeURI(uint256 _index, string memory _uri) public {
        _setTokenURI(_index, _uri);
        emit ChangeURI(_index, _uri);
    }

    function toggleEffect(uint256 _index, string memory _id) public {
        Effect storage _effect = effectData[_index][_id];
        require(_effect.init == true, "No such effect found");
        _effect._active = !_effect._active;
        emit EffectToggle(_index, _effect._key, _effect._active, _effect._uri);
    }

}
