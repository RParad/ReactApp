class FruitNew:
    def __init__(self):
        pass

    @staticmethod
    def newfruits():
        fruits = ["Apple", "Orange", "Pears", "Grapes", "Strawberry", "Blueberry", "Banana"]
        for i in range(0, len(fruits)):
                print(fruits[i])



print(FruitNew.newfruits())