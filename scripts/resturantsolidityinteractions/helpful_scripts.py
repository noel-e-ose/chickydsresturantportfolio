from brownie import network, accounts,config
import yaml
import json
import os
import shutil

def get_account():
    if network.show_active() == "development":
        return accounts[0]
    else:
        return accounts.add(config["wallets"]["from_key"])