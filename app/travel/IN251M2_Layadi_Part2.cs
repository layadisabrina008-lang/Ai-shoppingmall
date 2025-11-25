using System;

class Program
{
    static void Main()
    {
        //*********************************************************
        //****Assessment 3 Section 1
        //*********************************************************
        int gradeCount = 0;
        int gradeTotal = 0;
        while (gradeCount < 10)
        {
            Console.Write("Enter grade: ");
            string? input = Console.ReadLine();
            if (int.TryParse(input, out int grade))
            {
                gradeTotal += grade;
                gradeCount++;
            }
            else
            {
                Console.WriteLine("Invalid input. Please enter a whole number grade.");
            }
        }
        double classAverage = gradeTotal / 10.0;
        Console.WriteLine($"Total of all 10 grades is {gradeTotal}");
        Console.WriteLine($"Class average is {classAverage:0.##}");
        Console.WriteLine();

        //*********************************************************
        //****Assessment 3 Section 2
        //*********************************************************
        for (int k = 5; k >= 1; k--)
        {
            for (int i = 0; i <= 10; i += 2)
            {
                Console.WriteLine($"k = {k}, i = {i}");
            }
        }
        Console.WriteLine();

        //*********************************************************
        //****Assessment 3 Section 3
        //*********************************************************
        int sum = 0;
        while (true)
        {
            Console.Write("Enter a positive number to be added to the total or -1 to end: ");
            string? line = Console.ReadLine();
            if (!int.TryParse(line, out int number))
            {
                Console.WriteLine("Invalid input. Please enter a whole number.");
                continue;
            }

            if (number == -1)
            {
                break;
            }

            if (number > 0)
            {
                sum += number;
            }
            else
            {
                Console.WriteLine("Only positive numbers are added. Try again.");
            }
        }
        Console.WriteLine($"The sum of all numbers entered is {sum}");
    }
}

