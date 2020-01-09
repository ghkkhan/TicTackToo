#!/usr/bin/env python
# coding: utf-8

# In[2]:


import math


# In[3]:


class GameManager:
    board = [[None, None, None] for i in range(3)] # each list is one row. First dimension is row
    turn = 0 # player 0 or 1. player 0 is o's. Player 1 is x's
    game_over = 0
    total_moves = 0
    
#     def __init__(self):
        
    def display(self):
        grid = [[None, None, None] for i in range(3)] # sets the size of the grid
        # first dimension is which row
        
        # put numbers on board
        for row in range(3):
            for col in range(3):
                grid[row][col] = str(3*row + col)
                
        # put pieces on board
        for row in range(3):
            for col in range(3):
                if self.board[row][col] == 0:
                    grid[row][col] = 'O'
                elif self.board[row][col] == 1:
                    grid[row][col] = 'X'
        
        # print out grid
        
        for row in range(3):
            for col in range(3):
                if col == 2:
                    print(grid[row][col])
                else:
                    print(grid[row][col], end=' ')
                    
        
    def play(self):
        self.display()
        while self.game_over == False:
            print('player', self.turn, "'s turn")
            
            try:
                position = int(input('position'))
                
                #convert position (0-8) to row by column
                row = math.floor(position/3)
                col = position%3

                if not position in range(9): # position is not on board
                    print('position not on board, lose a turn')
                elif not self.board[row][col] == None: # position is already filled with a piece
                    print('place already taken, lose a turn')
                else:
                    self.board[row][col] = self.turn # if all is good, place piece on board

                # check for winner
                if self.check_for_winner() == 1:
                    print('player 1 wins')
                    self.game_over = True
                elif self.check_for_winner() == 0:
                    print('player 0 wins')
                    self.game_over = True
                    
                #print(self.board)
                
            except:
                print('invalid input, lose a turn')

            self.turn = (self.turn+1) % 2
            self.display()
            
#     def test(self, bot0):
#         data = {
#             "board": self.board,
#             "total_moves": self.total_moves
#         }
        
#         print(bot0.get_move(data))
    
    def play_bot_v_bot(self, bot0, bot1):
        self.display() # not needed
        while self.game_over == False:
            print('player', self.turn, "'s turn") # not needed
            
            data = {
                "board": self.board,
                "total_moves": self.total_moves
            }
            
            try:
                if self.turn == 0:
                    bot0.get_move(data) # write move to file output.txt
                    
                else:
                    bot1.get_move(data) # write move to file output.txt
                    
                f = open("output.txt", "r")
                position = int(f.read())
                print(position)
                
                #convert position (0-8) to row by column
                row = math.floor(position/3)
                col = position%3

                if not position in range(9): # position is not on board
                    print('position not on board, lose a turn')
                elif not self.board[row][col] == None: # position is already filled with a piece
                    print('place already taken, lose a turn')
                else:
                    self.board[row][col] = self.turn # if all is good, place piece on board

                # check for winner
                if self.check_for_winner() == 1:
                    print('player 1 wins')
                    self.game_over = True
                elif self.check_for_winner() == 0:
                    print('player 0 wins')
                    self.game_over = True
                    
                #print(self.board)
                
            except:
                print('invalid input, lose a turn')

            self.turn = (self.turn+1) % 2
            self.total_moves += 1
            self.display()
        
    
    def check_for_winner(self):
        # check horizontals
        for row in range(3):
            if self.board[row][0] == self.board[row][1] and self.board[row][1] == self.board[row][2] and not self.board[row][0] == None:
                return self.board[row][0]
        # check verticals
        for col in range(3):
#             print(self.board[0][col] == self.board[1][col])
#             print(self.board[1][col] == self.board[2][col])
            if self.board[0][col] == self.board[1][col] and self.board[1][col] == self.board[2][col] and not self.board[0][col] == None:
#                 print('here')
                return self.board[0][col]
        # check diagonals
        if self.board[0][0] == self.board[1][1] and self.board[1][1] == self.board[2][2] and not self.board[1][1] == None:
                return self.board[1][1]
        if self.board[0][2] == self.board[1][1] and self.board[1][1] == self.board[2][0] and not self.board[1][1] == None:
                return self.board[1][1]
        
        return None
        
                
    


# In[4]:


class Bot:
    decision_code = "" # must have varaible called 'pos' that is set to a position between 0-8
    
    def __init__(self, decision_code):
        self.decision_code = decision_code
        
    def get_move(self, data):
        # data comes in form of dictionary
        ####
        
        ####
        return exec(self.decision_code)


# In[5]:


g = GameManager()

string0 ="""
f = open("output.txt", "w")
"""

#input here
string0 += """
a = data["total_moves"] % 9
"""

string0 += """
f.write(str(a))
f.close()
"""

string1 ="""
f = open("output.txt", "w")
"""

#input here
string1 += """
a = data["total_moves"] * 4 % 9
"""

string1 += """
f.write(str(a))
f.close()
"""

bot0 = Bot(string0)
bot1 = Bot(string1)

#g.play()

#g.test(bot0)
g.play_bot_v_bot(bot0, bot1)


# In[ ]:




