#include <stdio.h>
#include <string.h>
#include <time.h>
#include <stdlib.h>

char board[3][3];
const char PLAYER = 'X';
const char AI = 'O';

void resetboard();
void printboard();
int checkfreespace();
void playermove();
void computermove();
char checkwinner();
void printwinner(char );

int main(){
    char winner =' ';

    resetboard();
    while (winner == ' ' && checkfreespace()!= 0)
    { 
            printboard();
            playermove();
            winner = checkwinner();
            if(winner != ' ' || checkfreespace() ==0)
            {
                break;
            }
            computermove();
            winner = checkwinner();
            if(winner != ' ' || checkfreespace() ==0)
            {
                break;
            }
    }

    printboard();
    printwinner(winner);

    return 0;
    


}
void resetboard()
{
    for(int i = 0; i < 3; i++)
    {
        for(int j = 0; j < 3; j++)
        {
            board[i][j] = ' ';
        }
    }
}
void printboard()
{
    printf(" %c | %c | %c ", board[0][0], board[0][1], board[0][2] );
    printf("\n---|---|---\n");
    printf(" %c | %c | %c ", board[1][0], board[1][1], board[1][2] );
    printf("\n---|---|---\n");
    printf(" %c | %c | %c ", board[2][0], board[2][1], board[2][2] );
    printf("\n");
}
int checkfreespace()
{
    int freespaces = 9;
    for (int i = 0; i < 3; i++)
    {
        for(int j = 0; j < 3; j++)
        {
            if(board[i][j] != ' ')
            {
                freespaces--;
            }
        }
    }
    return freespaces;
}
void playermove()
{
    int x;
    int y;
    do
    {
    printf("Enter a row #, 1-3: ");
    scanf("%d", &x);
    x--;
    printf("Enter a column #, 1-3: ");
    scanf("%d", &y);
    y--;
    if(board[x][y] != ' ')
    {
        printf("Invalid move\n");
    }else{
        board[x][y] = PLAYER;
        break;
    }
    } while (board[x][y] != ' ');
    

}
void computermove()
{
    srand(time(0));
    int x;
    int y;

    if(checkfreespace() > 0)
    {
        do
        {
            x = rand() % 3;
            y = rand() % 3;
        } while (board [x][y] != ' ');

        board[x][y] = AI;
        
    }else
    {
        printwinner(' ');
    }

}
char checkwinner()
{
    for(int i = 0; i <3; i++)
    {   if(board[i][0] == board[i][1] && board[i][0] == board[i][2])
    {
        return board[i][0];
    }
          for(int i = 0; i <3; i++) //check columns
        {   if(board[0][i] == board[1][i] && board[0][i] == board[2][i])
        {
            return board[0][i];
        }
    
        }
        //check diagonials 
    if(board[0][0] == board[1][1] && board[0][0] == board[2][2])
        {
            return board[0][0];
        }
    if(board[0][2] == board[1][1] && board[0][2] == board[2][0])
        {
            return board[0][2];
        }
        return ' ';
    }
}
void printwinner(char win )
{
    if(win == PLAYER)
    {
        printf("You win");
    }else if(win == AI)
    {
        printf("You lose");
    }else
    {
        printf("Tie");
    }
}
