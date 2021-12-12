from Fruits import FruitNames


class FruitSeeds(FruitNames):
    def __init__(self, fruit, colour, price):
        FruitNames.__init__(self, fruit, colour)
        self.price = price

    def Price(self):
        print ("The fruit " + self.fruit + " will cost you " + self.price)


f1 = FruitSeeds("Banana", "Yellow", "110")
f1.Price()
