import random


class Card():
    card_to_name = {1: "Ace", 2: "Two", 3: "Three", 4: "Four", 5: "Five",
                    6: "Six", 7: "Seven", 8: "Eight", 9: "Nine", 10: "Ten",
                    11: "Jack", 12: "Queen", 13: "King"}

    def __init__(self, value, suit):
        self.name = self.card_to_name[value]
        self.suit = suit
        self.title = "%s of %s" % (self.name, self.suit)
        self.score = min(value, 10)

    def __repr__(self):
        return self.title


class Hand():
    def __init__(self, cards):
        self.hand = cards

    def get_scores(self):
        num_aces = sum(card.name == "Ace" for card in self.hand)
        score = sum(card.score for card in self.hand)
        return [score + i*10 for i in range(num_aces+1)]

    def possible_scores(self):
        return [s for s in self.get_scores() if s <= 21]

    def __repr__(self):
        return str(self.hand)


class Deck():
    unshuffled_deck = [Card(card, suit) for card in range(1, 14)
                       for suit in ["Clubs", "Diamonds", "Hearts", "Spades"]]

    def __init__(self):
        self.deck = self.unshuffled_deck
        random.shuffle(self.deck)

    def deal_card(self):
        return self.deck.pop()

    def deal_hand(self, num_cards=2):
        return Hand([self.deal_card() for i in range(num_cards)])


class Player():
    def __init__(self, name="Player 1"):
        self.name = name

    def new_hand(self, hand):
        self.hand = hand

    def hit(self, card):
        self.hand.hand.append(card)

    def is_bust(self):
        return len(self.hand.possible_scores()) == 0

    def scores(self):
        return self.hand.get_scores() if self.is_bust() else self.hand.possible_scores()

    def __repr__(self):
        player_str = self.name + " (BUST)" if self.is_bust() else self.name
        return "Player: {}\nCards: {}\nScore: {}".format(
            player_str, self.hand, self.scores())


class Game():
    def __init__(self, deck, player, dealer):
        self.deck = deck
        self.player = player
        self.dealer = dealer

        print(self)

    def judge_winner(self, hand1, hand2):
        winning = False
        if max(hand1) >= max(hand2):
                winning = True

        return winning

    def play(self, action=""):
        options = ['hit', 'stick']
        action = action if action else input('hit or stick? ')

        if action not in options:
            raise ValueError("You are only able to 'hit' or 'stick")

        if action == "hit":
            self.player.hit(self.deck.deal_card())
            print('\n{}'.format(self.player))

            if self.player.is_bust():
                return print("\nGAME OVER - Dealer wins :(")

            self.play()

        if action == "stick":
            if self.dealer.is_bust():
                return print("\nGAME OVER - You win :)")

            if self.judge_winner(self.dealer.hand.possible_scores(),
                                 self.player.hand.possible_scores()):
                return print("\nGAME OVER - Dealer wins :(")

            self.dealer.hit(self.deck.deal_card())
            print('\n{}'.format(self.dealer))

            self.play("stick")

    def __repr__(self):
        return "{}\n\n{}\n".format(self.player, self.dealer)


D = Deck()

p = Player("Ross")
h = D.deal_hand()
p.new_hand(h)

d = Player("Dealer")
h = D.deal_hand(1)
d.new_hand(h)

g = Game(D, p, d)
g.play()
