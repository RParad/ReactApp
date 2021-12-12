#create a object, here is the superclass/parent class

class FruitNames:

    def __init__(self, fruit, colour):
        self.fruit = fruit
        self.colour = colour

    def myfruit(self):
        print("Hello I am a " + self.colour + " " + self.fruit)

p1 = FruitNames("Apple", "Green")
p1.myfruit()