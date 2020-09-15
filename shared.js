class Person
{
  constructor(firstName, lastName, email)
  {
    this._firstName = firstName;
    this._lastName = lastName;
    this._email = email;
  }

  // Getter and setter of attributes
  get firstName(){return this._firstName;}
  get lastName(){return this._lastName;}
  get email(){return this._email;}

  set firstName(newFirstName){this._firstName = newFirstName;}
  set lastName(newLastName){this._lastName = newLastName;}
  set email(newEmail){this._email = newEmail;}

  fromData(dataObject){
    this._firstName = dataObject._firstName;
    this._lastName = dataObject._lastName;
    this._email = dataObject._email;
  }
}
