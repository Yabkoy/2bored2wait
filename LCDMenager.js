const LCD = require('raspberrypi-liquid-crystal');

const LCDMenager = class LCDMenager
{
    validateParameters(GPIO_Adress, colums, rows)
    {
        if(GPIO_Adress == undefined || colums == undefined || rows == undefined)
            throw "No Parameters for LCD Menager Class!";
    }

    constructor(GPIO_Adress, colums, rows)
    {
        this.validateParameters(GPIO_Adress, colums, rows);

        this.lcd = new LCD(1, GPIO_Adress, colums, rows);
        
        this.colums = colums;
        this.rows = rows;
     
        this.lcd.beginSync();
        this.lcd.clearSync();
    }

    clearDisplay()
    {
        this.lcd.clearSync();
    }

    printOnDisplay(text, row)
    {
        this.lcd.printLineSync(row, text);
    }

    setDisplayState(state)
    {
        if(state == true)
        { 
            this.lcd.display();
        }
        else
        {
            this.lcd.noDisplay();
        }
    }
    
    //Setting Informations
    setQueue(QueuePlace)
    {
        this.printOnDisplay('Queue: '+QueuePlace, 0);
    }
    setETA(ETAText)
    {
        this.printOnDisplay('ETA: '+ETAText, 1);
    }

    setETAAndQueue(QueuePlace, ETAText)
    {
        this.clearDisplay();
        this.setQueue(QueuePlace);
        this.setETA(ETAText);
    }

    setText(text)
    {
        this.clearDisplay();

        var maxLetters = this.colums*this.rows;

        if(text.length > maxLetters)
        {
            throw "Text won't fill into the display!";
        }

        for(var i=0; i<this.rows; i++)
        {
            var currentText = text.substring(i*this.colums, (i+1)*this.colums);
            this.printOnDisplay(currentText, i);
        }

    }
};

module.exports = LCDMenager;