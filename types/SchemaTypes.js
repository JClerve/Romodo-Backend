/**
 * Vehicle interface
 * @interface
 * @extends Document
 */
function Vehicle() {
    /**
     * Vehicle number
     * @type {string}
     */
    this.no = "";

    /**
     * Vehicle type
     * @type {string}
     */
    this.type = "";

    /**
     * Chassis number
     * @type {string}
     */
    this.chassisNo = "";

    /**
     * Production year
     * @type {Date}
     */
    this.productionYear = new Date();

    /**
     * Whether the vehicle has AC
     * @type {boolean}
     */
    this.ac = false;

    /**
     * Vehicle brand
     * @type {string}
     */
    this.brand = "";

    /**
     * Availability of the vehicle
     * @type {boolean}
     */
    this.availability = true;

    /**
     * Fuel type of the vehicle
     * @type {string}
     */
    this.fuelType = "";

    /**
     * Number of seats in the vehicle
     * @type {number}
     */
    this.noOfSeats = 0;
}

/**
 * Driver interface
 * @interface
 * @extends Document
 */
function Driver() {
    /**
     * Driver number
     * @type {string}
     */
    this.no = "";

    /**
     * Date
     * @type {Date}
     */
    this.date = new Date();

    /**
     * First name of the driver
     * @type {string}
     */
    this.firstName = "";

    /**
     * Last name of the driver
     * @type {string}
     */
    this.lastName = "";

    /**
     * National ID card number of the driver
     * @type {string}
     */
    this.nic = "";

    /**
     * Gender of the driver
     * @type {string}
     */
    this.gender = "";

    /**
     * Date of birth of the driver
     * @type {Date}
     */
    this.dob = new Date();

    /**
     * Contact number of the driver
     * @type {string}
     */
    this.contactNo = "";

    /**
     * Email of the driver
     * @type {string}
     */
    this.email = "";

    /**
     * License number of the driver
     * @type {string}
     */
    this.licenseNo = "";

    /**
     * License expiration date of the driver
     * @type {Date}
     */
    this.licenseExpireDate = new Date();

    /**
     * Medical issues of the driver
     * @type {string}
     */
    this.medicalIssues = "";

    
        
}

/**
 * User interface
 * @interface
 * @extends Document
 */
function User() {
    /**
     * Username
     * @type {string}
     */
    this.username = "";

    /**
     * Email
     * @type {string}
     */
    this.email = "";

    /**
     * Password
     * @type {string}
     */
    this.password = "";
}

/** 
Passenger interface
@interface
@extends Document
*/


function Passenger() {
    /**
    * Passenger's email
    * @type {string}
    */
    this.email = '';
   
   /**
    * Username
    * @type {string}
    */
   this.username = '';

   /**
    * Password
    * @type {string}
    */
   this.password = '';
   
   /**
    * Passenger's first name
    * @type {string}
    */
   this.firstName = '';


   /**
    * Passenger's last name
    * @type {string}
    */
   this.lastName = '';

   /**
    * Passenger's NIC number
    * @type {string}
    */
   this.nicNo = '';

    /**
    *Gender    
       * @type {string}
       */
    this.gender = '';
    
       /**
        * Passenger's date of birth
        * @type {Date}
        */
       this.dateOfBirth = new Date();

       /**
        * Passenger's contact number
        * @type {string}
        */
       this.contactNo = '';

       /**
        * Passenger's service number
        * @type {string}
        */
       this.serviceNo = '';

       /**
        * company name
        * @type {string}
        */
       this.companyName = '';

       /**
       * Indicates whether the passenger is internal or external
       * @type {boolean}
       */
       this.isInternal = false;
        

         /**
          * Indicates whether the passenger is active
          * @type {boolean}
          */
            this.isActive = true;



}



module.exports = {
    Vehicle: Vehicle,
    Driver: Driver,
    User: User,
    Passenger: Passenger

};
