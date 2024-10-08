import click
import utils


@click.command()
@click.argument("email")
@click.argument("password")
def quick_test(email, password):
    token = utils.get_user_token(email, password)
    data = utils.make_get_request(f"base_data/wsble2/Stations", token)
    print(data)


if __name__ == "__main__":
    quick_test()
