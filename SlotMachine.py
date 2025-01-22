import random
MAX_LINES = 3
MAX_BET = 100
MIN_BET = 1

ROWS = 3
COLS = 3

symbol_ct = {"A" : 2, "B" : 4, "C" : 6, "D" : 8}
symbol_ve = {"A" : 10, "B" : 7, "C" : 5, "D" : 3}
def check_winning(columns,lines,bet,values):
    winning_lines = []
    winnings = 0
    for line in range(lines):
        for line in range(lines):
            symbol = columns[0][line]
            for column in columns:
                symbol_to_chk = column[line]
                if symbol != symbol_to_chk:
                    break
            else:
                winnings += values[symbol] * bet
                winning_lines.append(line + 1)
                
    return winnings, winning_lines

def get_slot_spin(rows, cols, symbols):
    all_symbols = []
    #Get the key and symbol counts per symbol item
    for symbol, symbol_ct  in symbols.items():
        #Add the symbol in the list per symbol count
        for _ in range(symbol_ct):
            all_symbols.append(symbol)
    columns = []
    for col in range(cols):
        column = []
        current_symbols = all_symbols[:]
        for row in range(rows):
            value = random.choice(current_symbols)
            current_symbols.remove(value)
            column.append(value)
            
        columns.append(column)
        
    return columns

def print_slots(columns):
    for row in range(len(columns[0])):
        for i, column in enumerate(columns):
            if i != len(columns) - 1:
                print(column[row], end =" | ")
            else:
                print(column[row], end = "")
        print()
        
def deposit():
    while True:
        amount = input("How much to deposit?: $")
        if amount.isdigit():
            amount = int(amount)
            if amount > 0:
                break
            else:
                print("Amm must be greater than 0")
        else:
            print("enter a number pls")
    return amount

def get_number_of_lines():
    while True:
        lines = input("How many lines do you want to bet(1- " + str(MAX_LINES) + "): ")
        if lines.isdigit():
            lines = int(lines)
            if 1 <= lines <= MAX_LINES:
                break
            else:
                print("Enter valid # of lines")
        else:
            print("enter a number pls")
    return lines

def get_bet():
    while True:
        amount = input("what shall you bet on each line?: $ ")
        if amount.isdigit():
            amount = int(amount)
            if MIN_BET <= amount <= MAX_BET:
                break
            else:
                print(f"Amm must be between ${MIN_BET}-{MAX_BET} ")
        else:
            print("enter a number pls")
    return amount
def spins(balance):
    lines = get_number_of_lines()
    
    while True: #Checks if Balance is within bet raNGE
        bet = get_bet()
        totalb = bet * lines
        if totalb > balance:
            print("You have insufficent funds try again. Your bal is {balance}")
            bet = get_bet()
        else:
            break
        
    print(f"you are betting ${bet} on {lines} lines. Total bet is equal to ${totalb}")
    slots = get_slot_spin(ROWS, COLS, symbol_ct)
    print_slots(slots)
    winnings, winning_lines = check_winning(slots, lines, bet, symbol_ve)
    print(f"You won: $" + str(winnings))
    return winnings - totalb
def main():
    balance = deposit()
    while True:
        print(f"Current ball is {balance}")
        spin = input("Press enter to spin or q to quit: ")
        if spin == "q":
            break
        balance += spins(balance)
    
    
main()
