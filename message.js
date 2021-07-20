const Command = require("./command");

class Message {
   constructor(name, commands) {
      this.commands = commands
      if(!name) {
         throw Error("Name required.");
      }
    this.name = name;
   }
}
    


module.exports = Message;