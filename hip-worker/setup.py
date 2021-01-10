import setuptools

with open("README.md", "r") as fh:
    long_description = fh.read()

setuptools.setup(
    name="hipWorker", # Replace with your own username
    version="0.0.1",
    author="Silvertoken",
    author_email="1569232+silvertoken@users.noreply.github.com",
    description="Worker module for Home Inetrgration Platform",
    long_description=long_description,
    long_description_content_type="text/markdown",
    url="https://github.com/silvertoken/HomeIntegrationPlatform",
    packages=setuptools.find_packages(),
    classifiers=[
        "Programming Language :: Python :: 3",
        "License :: OSI Approved :: MIT License",
        "Operating System :: OS Independent",
    ],
    python_requires='>=3.6',
)