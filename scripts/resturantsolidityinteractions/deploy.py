from brownie import accounts, config, network,PaymentContract
from scripts.resturantsolidityinteractions.helpful_scripts import get_account
import os
import yaml
import json
import shutil

def deploy_tomain(front_end_update=False):
    account = get_account()
    price_feed_address=config["networks"][network.show_active()]["eth_usd_price_feed"]
    makepayment = PaymentContract.deploy(price_feed_address,{"from": account}, publish_source=config["networks"][network.show_active()].get("verify"),)
    if front_end_update:
        update_front_end()
    print(makepayment)
    # print(stored_value)
    # account = accounts.load("test-account")
    # print(account)
    # account = accounts.add(config["wallets"]["from_key"])
    # print(account)


def update_front_end():
    # Send the build folder
    copy_folders_to_front_end("./build", "./front_end/src/chain-info")

    # Sending the front end our config in JSON format
    with open("brownie-config.yaml", "r") as brownie_config:
        config_dict = yaml.load(brownie_config, Loader=yaml.FullLoader)
        with open("./front_end/src/brownie-config.json", "w") as brownie_config_json:
            json.dump(config_dict, brownie_config_json)
    print("Front end updated!")


def copy_folders_to_front_end(src, dest):
    if os.path.exists(dest):
        shutil.rmtree(dest)
    shutil.copytree(src, dest)


def main():
    deploy_tomain(front_end_update=True)