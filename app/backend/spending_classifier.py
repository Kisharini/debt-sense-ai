from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression

texts = [
    "GrabFood Ayam Gepuk Pak Gembus",
    "Foodpanda delivery",
    "Netflix subscription",
    "Spotify premium",
    "Shopee purchase",
    "Lazada order",
    "Touch n Go reload",
    "Grab ride",
]

labels = [
    "Food",
    "Food",
    "Entertainment",
    "Entertainment",
    "Shopping",
    "Shopping",
    "Transport",
    "Transport",
]

#Train model
vectorizer = TfidfVectorizer()
x = vectorizer.fit_transform(texts)

model = LogisticRegression()
model.fit(x, labels)

def classify_transaction(description):
    vector = vectorizer.transform([description])
    prediction = model.predict(vector)
    
    return prediction[0]
