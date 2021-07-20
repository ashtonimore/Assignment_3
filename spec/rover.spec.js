const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function() {

  it("constructor sets position and default values for mode and generatorWatts", function(){
    let roverTest = new Rover(98382);
    expect(roverTest.position, roverTest.mode, roverTest.generatorWatts).toEqual(98382, "NORMAL", 110);
  });

  it("response returned by receiveMessage contains name of message", function(){
    let roverTest = new Rover(98382);
    expect(roverTest.receiveMessage(new Message("name", [])).messageName).toEqual("name");
  });

  it("response returned by receiveMessage includes two results if two commands are sent in the message", function(){
    let roverTest = new Rover(98382);
    expect(roverTest.receiveMessage(new Message("name", [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')])).results.length).toEqual(2);
  });

  it("responds correctly to status check command", function(){
    let roverTest = new Rover(98382);
    let roverTest2 = roverTest.receiveMessage(new Message("name", [new Command('STATUS_CHECK')]))
    expect(roverTest2.results).toEqual([{completed:true, roverStatus: {mode: 'NORMAL', generatorWatts:110, position:98382}}]);
  });

  it("responds correctly to mode change command", function(){
    let roverTest = new Rover(98382);
    let roverTest2 = roverTest.receiveMessage(new Message("name", [new Command('MODE_CHANGE', 'LOW_POWER')]));
    expect(roverTest.mode).toEqual("LOW_POWER");
  });

  it("responds with false completed value when attempting to move in LOW_POWER mode", function(){
    let roverTest = new Rover(98382);
    let roverTest2 = roverTest.receiveMessage(new Message("name", [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('MOVE', 69420)]));
    expect(roverTest2.results[1]).toEqual({completed:false});
  });

  it("esponds with position for move command", function(){
    let roverTest = new Rover(98382);
    let roverTest2 = roverTest.receiveMessage(new Message("name", [new Command('MOVE', 69420)]));
    expect(roverTest.position).toEqual(69420);
  })
 


});
