import argparse

import yaml
from myrss.app import app

spec = app.openapi()

if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--output", type=str, default="openapi.yaml")
    args = parser.parse_args()

    with open(args.output, "w") as f:
        yaml.dump(spec, f)
