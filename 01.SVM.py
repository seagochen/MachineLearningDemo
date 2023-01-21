import numpy as np
import matplotlib.pyplot as plt

# 生成随机数据
np.random.seed(0)

# 上半部分数据
upper_x = np.random.normal(3, 1.5, (1000, 1))
upper_y = np.random.normal(3, 1.5, (1000, 1))

# 下半部分数据
lower_x = np.random.normal(-3, 1.5, (1000, 1))
lower_y = np.random.normal(-3, 1.5, (1000, 1))

# 合并上下半部分数据
X = np.concatenate((upper_x, lower_x), axis=0)
y = np.concatenate((upper_y, lower_y), axis=0)
y = y.ravel()

# 梯度下降与损失函数
def svm_loss(W, X, y, C=1.0):
    n_samples, n_features = X.shape
    margins = np.maximum(0, 1 - y * np.dot(X, W))
    loss = (np.sum(margins) + 0.5 * C * np.dot(W, W)) / n_samples
    return loss

def svm_grad(W, X, y, C=1.0):
    n_samples, n_features = X.shape
    margins = np.maximum(0, 1 - y * np.dot(X, W))
    grad = -(np.dot(X.T, y * (margins > 0))) / n_samples + C * W
    return grad

# 数据训练
def train(X, y, C=1.0, max_iter=1000, tol=1e-5):
    n_samples, n_features = X.shape
    W = np.zeros((n_features,))
    for i in range(max_iter):
        loss = svm_loss(W, X, y, C)
        grad = svm_grad(W, X, y, C)
        W -= grad
        if np.linalg.norm(grad) < tol:
            break
    return W

# 预测
def predict(X, W):
    return np.sign(np.dot(X, W))

# 实验
W = train(X, y, C=1.0)

# Generate test data set
test_x = np.random.normal(0, 1, (100, 1))
test_y = np.random.normal(0, 1, (100, 1))

# Predict the result
pred = predict(test_x, W)

# 把原始数据集，还有生成的预测数据集画出来
plt.scatter(X, y, c='blue')
plt.scatter(test_x[pred == 1], test_y[pred == 1], c='red')
plt.scatter(test_x[pred == -1], test_y[pred == -1], c='green')
plt.show()
