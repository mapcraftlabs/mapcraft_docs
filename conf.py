# Configuration file for the Sphinx documentation builder.
#
# For the full list of built-in configuration values, see the documentation:
# https://www.sphinx-doc.org/en/master/usage/configuration.html

# -- Project information -----------------------------------------------------
# https://www.sphinx-doc.org/en/master/usage/configuration.html#project-information

project = "MapCraft"
copyright = "2025, MapCraft"
author = "MapCraft"

# -- General configuration ---------------------------------------------------
# https://www.sphinx-doc.org/en/master/usage/configuration.html#general-configuration

extensions = ["myst_parser"]

templates_path = ["docs/_templates"]
exclude_patterns = [
    "configuration",
    "google_sheets",
    "python_example",
    "quicksims",
    "README.md",
    "curl.md",
    "docs/_build",
    "Thumbs.db",
    ".DS_Store",
]


# -- Options for HTML output -------------------------------------------------
# https://www.sphinx-doc.org/en/master/usage/configuration.html#options-for-html-output

html_theme = "sphinx_book_theme"
html_static_path = ["docs/_static"]
