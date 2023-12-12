"""empty message

Revision ID: 5c0497cd90af
Revises: 09d081ae372b
Create Date: 2023-12-05 12:04:11.514546

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision = '5c0497cd90af'
down_revision = '09d081ae372b'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('orders', schema=None) as batch_op:
        batch_op.add_column(sa.Column('order_phonenumber', sa.String(length=120), nullable=True))

    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.alter_column('user_address',
               existing_type=mysql.VARCHAR(length=200),
               nullable=True)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.alter_column('user_address',
               existing_type=mysql.VARCHAR(length=200),
               nullable=False)

    with op.batch_alter_table('orders', schema=None) as batch_op:
        batch_op.drop_column('order_phonenumber')

    # ### end Alembic commands ###