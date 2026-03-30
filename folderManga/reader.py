import os


def get_redirect_urls_from_folder(path: str) -> list[str]:
    """Return a list of actual URLs from internet shortcut files in a folder."""
    if not os.path.isdir(path):
        raise ValueError(f"'{path}' is not a valid directory.")

    urls = []
    for filename in os.listdir(path):
        file_path = os.path.join(path, filename)

        if not os.path.isfile(file_path):
            continue

        # Windows .url file
        if filename.lower().endswith(".url"):
            with open(file_path, "r", encoding="utf-8", errors="ignore") as f:
                for line in f:
                    if line.strip().startswith("URL="):
                        urls.append(line.strip().split("=", 1)[1])
                        break

    return urls




