from sklearn.datasets import load_iris
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.decomposition import PCA
import numpy as np

# 读取鸢尾花数据集
iris = load_iris()
X = iris.data
y = iris.target
target_names = iris.target_names
feature_names = iris.feature_names

# 将数据转换为DataFrame格式
df = pd.DataFrame(X, columns=feature_names)
df['target'] = y

# 绘制协方差矩阵的散点图
sns.pairplot(df, vars=feature_names, hue='target', palette=['blue', 'red', 'green'], markers=['o', '^', 's'])
plt.show()

# 计算协方差矩阵
cov_matrix = np.cov(X.T)

# 绘制协方差矩阵
sns.heatmap(cov_matrix, annot=True, cmap='Blues')
plt.show()

# 读取鸢尾花数据集
iris = load_iris()
X = iris.data

# 计算协方差矩阵的特征值和特征向量
eigvals, eigvecs = np.linalg.eig(cov_matrix)

# 打印特征值和特征向量
print('特征值:', eigvals)
print('特征向量:', eigvecs)


# 使用PCA降维
pca = PCA(n_components=2)
X_new = pca.fit_transform(X)

# 将数据转换为DataFrame格式
df_new = pd.DataFrame(X_new, columns=['PC1', 'PC2'])
df_new['target'] = y

# 绘制散点图
colors = ['blue', 'red', 'green']
markers = ['o', '^', 's']
fig, ax = plt.subplots()
for i, target_name in enumerate(target_names):
    ax.scatter(df_new[df_new['target'] == i]['PC1'],
               df_new[df_new['target'] == i]['PC2'],
               c=colors[i], marker=markers[i], label=target_name)
ax.set_xlabel('PC1')
ax.set_ylabel('PC2')
ax.legend()
plt.show()
