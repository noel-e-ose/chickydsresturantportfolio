"""empty message

Revision ID: 02fc8d5697b4
Revises: 
Create Date: 2023-11-28 18:45:14.135256

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '02fc8d5697b4'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('cart',
    sa.Column('cart_id', sa.Integer(), autoincrement=True, nullable=False),
    sa.Column('cart_item', sa.String(length=120), nullable=True),
    sa.Column('cart_item_quantity', sa.String(length=120), nullable=True),
    sa.Column('cart_item_price', sa.String(length=120), nullable=True),
    sa.PrimaryKeyConstraint('cart_id')
    )
    op.create_table('orders',
    sa.Column('order_id', sa.Integer(), autoincrement=True, nullable=False),
    sa.Column('ordered_byaddress', sa.String(length=120), nullable=True),
    sa.Column('ordered_byfullname', sa.String(length=120), nullable=True),
    sa.Column('item_ordered', sa.String(length=120), nullable=True),
    sa.Column('order_amount', sa.String(length=120), nullable=True),
    sa.Column('order_status', sa.String(length=120), nullable=True),
    sa.PrimaryKeyConstraint('order_id')
    )
    op.create_table('user',
    sa.Column('user_address', sa.String(length=200), nullable=True),
    sa.Column('user_fullname', sa.String(length=100), nullable=True),
    sa.Column('user_email', sa.String(length=120), nullable=True),
    sa.Column('user_homeaddress', sa.String(length=120), nullable=True),
    sa.Column('user_phn', sa.String(length=120), nullable=True),
    sa.PrimaryKeyConstraint('user_address')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('user')
    op.drop_table('orders')
    op.drop_table('cart')
    # ### end Alembic commands ###