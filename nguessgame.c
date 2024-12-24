#include <stdio.h>
#include <string.h>
#include <time.h>
#include <stdlib.h>

int main(){
    srand(time(0)); //seed the random number generator
    int num = rand()  %100 + 1; //generate a random number between 1 and 100
    int guess;
    int tries = 1;
    printf("Guess a random numbere between 1 and 100: ");

    scanf("%d", &guess);
    
      
  while (guess != num)
    {
        
        char again;
        printf("Wrong do you want to try again? (y/n): ");
        scanf(" %c", &again); // Added a space before %c to consume any leftover newline character
        if(again == 'n')
        {
            printf("The answer was %d, goodbye! ", num);
            break;
        }
        else if(again == 'y')
        {
            printf("Guess the random numbere between 1 and 100: ");
            scanf(" %d", &guess);
            tries +=1;
        }
        else{
            printf("Invalid input");
        }
        
    }
    if (guess == num)
    {
        printf("Congrats it took you %d tries", tries);
    }
    
    
    


    return 0;
}