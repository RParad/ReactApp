#Python handbook task
#Requirements
#Create a function that will return a dictionary with the count of words in a given sentence

sentence = 'Qualitest is the greatest company on the planet, no other company compares'.split()
list = []

for i in sentence:

    sentence_count = sentence.count(i)
    list.append((i, sentence_count))

dict_count = dict(list)

print dict_count