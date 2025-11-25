using System;

class Program
{
    static void Main()
    {
        //*********************************************************
        //****Assessment 2 Section 1
        //*********************************************************
        Console.Write("Enter first integer: ");
        int first = Convert.ToInt32(Console.ReadLine());

        Console.Write("Enter second integer: ");
        int second = Convert.ToInt32(Console.ReadLine());

        if (first == second)
            Console.WriteLine($"{first} == {second}");
        if (first != second)
            Console.WriteLine($"{first} <> {second}");
        if (first < second)
            Console.WriteLine($"{first} < {second}");
        if (first > second)
            Console.WriteLine($"{first} > {second}");
        if (first <= second)
            Console.WriteLine($"{first} <= {second}");
        if (first >= second)
            Console.WriteLine($"{first} >= {second}");

        Console.WriteLine();

        //*********************************************************
        //****Assessment 2 Section 2
        //*********************************************************
        Console.Write("Enter grade and determine whether you passed: ");
        int grade = Convert.ToInt32(Console.ReadLine());

        if (grade >= 60)
            Console.WriteLine("Congratulations, you passed.");
        else
            Console.WriteLine("Sorry, you failed.");

        Console.WriteLine();

        //*********************************************************
        //****Assessment 2 Section 3
        //*********************************************************
        Console.Write("Enter the number of the month (1–12): ");
        int month = Convert.ToInt32(Console.ReadLine());
        string monthName;

        if (month == 1) monthName = "January";
        else if (month == 2) monthName = "February";
        else if (month == 3) monthName = "March";
        else if (month == 4) monthName = "April";
        else if (month == 5) monthName = "May";
        else if (month == 6) monthName = "June";
        else if (month == 7) monthName = "July";
        else if (month == 8) monthName = "August";
        else if (month == 9) monthName = "September";
        else if (month == 10) monthName = "October";
        else if (month == 11) monthName = "November";
        else if (month == 12) monthName = "December";
        else monthName = "Invalid month number.";

        Console.WriteLine(monthName == "Invalid month number."
            ? monthName
            : $"The Month is {monthName}.");

        Console.WriteLine();

        //*********************************************************
        //****Assessment 2 Section 4
        //*********************************************************
        Console.Write("Enter the number of the day of the week (1–7): ");
        int day = Convert.ToInt32(Console.ReadLine());

        switch (day)
        {
            case 1: Console.WriteLine("Sunday"); break;
            case 2: Console.WriteLine("Monday"); break;
            case 3: Console.WriteLine("Tuesday"); break;
            case 4: Console.WriteLine("Wednesday"); break;
            case 5: Console.WriteLine("Thursday"); break;
            case 6: Console.WriteLine("Friday"); break;
            case 7: Console.WriteLine("Saturday"); break;
            default: Console.WriteLine("Invalid day number."); break;
        }
    }
}

