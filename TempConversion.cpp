#include <iostream>
#include <vector>
    using std::cout;
    using std::string;

int main(){

    double temp;
    char unit;
    do
    {
    cout << "F = Farenheight, C = Celsious, PickOne (C/F): ";
    std::cin >> unit;
        if(unit == 'F' || unit == 'f')
    {
        cout << "Enter desired Temp in Celsius: ";
        std::cin >> temp;
        temp = (1.8 * temp) + 32.0;
        cout << "Temperature is " << temp << " degrees Farenheight" << std::endl;
        break;
    }
    else if(unit == 'C' || unit == 'c'){
        cout << "Enter desired Temp in Farenheight: ";
        std::cin >> temp;
        temp = (temp -32)/ 1.8;
        cout << "Temperature is " << temp << " degrees Celsious" << std::endl;
        break;
    }else{
        cout << "Please enter only C or F" << std::endl;
    }
    } while (unit != 'C' || unit != 'c' || unit != 'F' || unit != 'F');

        return 0;
    }

