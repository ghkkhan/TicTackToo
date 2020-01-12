import math
import sys
import copy

class GameManager:
    board = [[None, None, None] for i in range(3)] # each list is one row. First dimension is row
    turn = 0 # player 0 or 1. player 0 is o's. Player 1 is x's
    game_over = 0
    total_moves = 0
    move_history = [] # array containing of board game states
    
    
    def play_bot_v_bot(self, bot0, bot1):
        while self.game_over == False:
            
            data = {
                "board": self.board,
                "total_moves": self.total_moves
            }
            
            #########
            if self.turn == 0:
                bot0.get_move(data) # write move to file output.txt
                
            else:
                bot1.get_move(data) # write move to file output.txt
                
            f = open("output.txt", "r")
            position = int(f.read())
            # print(position)
            
            #convert position (0-8) to row by column
            row = math.floor(position/3)
            col = position%3

            if not position in range(9): # position is not on board
                # print('position not on board, lose a turn')
                self.move_history.append('position not on board')
            elif not self.board[row][col] == None: # position is already filled with a piece
                # print('place already taken, lose a turn')
                self.move_history.append('position already taken')
            else:
                self.board[row][col] = self.turn # if all is good, place piece on board
                board_snapshot = copy.deepcopy(self.board)
                self.move_history.append(board_snapshot)

            # check for winner
            
            if self.check_for_winner() == 1:
                # print('player 1 wins')
                self.print_data(1, True)
                
                self.game_over = True
            elif self.check_for_winner() == 0:
                # print('player 0 wins')
                self.print_data(0, True)
                
                self.game_over = True 
            ############

            self.turn = (self.turn+1) % 2
            self.total_moves += 1
    
    
    def print_data(self, winner, game_finished):
        final_game_data = {
            "winner": winner,
            "moveHistory": self.move_history,
            "finalGameSate": self.board,
            "gameFinished": game_finished
        }
        print(final_game_data)
        sys.stdout.flush()
    
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
        
class Bot:
    decision_code = "" # must have varaible called 'pos' that is set to a position between 0-8
    
    def __init__(self, file_path):
        f = open(file_path, "r")
        self.decision_code = """f = open("output.txt", "w")\n"""
        self.decision_code += f.read()
        self.decision_code += """\nf.write(str(a))\nf.close()"""
        
    def get_move(self, data):
        # data comes in form of dictionary
        ####
        # print(self.decision_code)
        ####
        exec(self.decision_code)
        
                
  
######################
f = open("output.txt", "r")
g = GameManager()

bot0 = Bot('bot0.txt')
bot1 = Bot('bot1.txt')

#print(bot0.decision_code)

#g.play()

#g.test(bot0)
g.play_bot_v_bot(bot0, bot1)