import pytest

from blackJack import Card, Hand, Deck, Player


class TestCard:
    def test_basic_init(self):
        card = Card(10, "Clubs")
        assert card.name == "Ten"
        assert card.title == "Ten of Clubs"
        assert card.score == 10

    def test_face_card(self):
        card = Card(12, "Clubs")
        assert card.title == "Queen of Clubs"
        assert card.score == 10


class TestHand:
    def test_basic_init(self):
        hand = Hand([Card(10, 'Hearts'), Card(1, 'Diamonds')])
        assert len(hand.hand) == 2

    def test_hand_scoring(self):
        hand = Hand([Card(10, 'Hearts'), Card(2, 'Diamonds')])
        assert hand.get_scores() == [12]

    def test_hand_scoring_with_ace(self):
        hand = Hand([Card(10, 'Hearts'), Card(1, 'Diamonds')])
        assert hand.get_scores() == [11, 21]
    
    def test_hand_possibles(self):
        hand = Hand([Card(10, 'Hearts'), Card(2, 'Diamonds')])
        assert hand.possible_scores() == [12]

    def test_hand_possibles_with_aces(self):
        hand = Hand([Card(10, 'Hearts'), Card(1, 'Diamonds')])
        assert hand.possible_scores() == [11, 21]

    def test_hand_possibles_with_bust_hand(self):
        hand = Hand([Card(10, 'Hearts'), Card(2, 'Diamonds'), Card(10, 'Spades')])
        assert hand.possible_scores() == []

    def test_hand_possibles_with_bust_hand_but_ace(self):
        hand = Hand([Card(10, 'Hearts'), Card(1, 'Diamonds'), Card(10, 'Spades')])
        assert hand.possible_scores() == [21]


class TestDeck:
    def test_basic_init(self):
        deck = Deck()
        assert len(deck.deck) == 52

    def test_deal_card(self):
        deck = Deck()
        card = deck.deal_card()
        assert type(card) == Card
        assert len(deck.deck) == 51

'''
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
'''
class TestPlayer:
    def test_hit(self):
        player = Player()
        player.new_hand(Hand([Card(10, 'Hearts'), Card(2, 'Diamonds')]))
        assert len(player.hand.hand) == 2
        player.hit(Card(10, 'Clubs'))
        assert len(player.hand.hand) == 3

    def test_is_bust(self):
        player = Player()
        player.new_hand(Hand([Card(10, 'Hearts'), Card(2, 'Diamonds')]))
        assert player.is_bust() == False
        player.hit(Card(10, 'Clubs'))
        assert player.is_bust() == True
