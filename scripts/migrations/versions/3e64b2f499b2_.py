"""empty message

Revision ID: 3e64b2f499b2
Revises: 5c0497cd90af
Create Date: 2023-12-06 18:10:43.098533

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision = '3e64b2f499b2'
down_revision = '5c0497cd90af'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('orders', schema=None) as batch_op:
        batch_op.alter_column('item_ordered',
               existing_type=mysql.VARCHAR(length=120),
               type_=sa.String(length=500),
               existing_nullable=True)

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
        batch_op.alter_column('item_ordered',
               existing_type=sa.String(length=500),
               type_=mysql.VARCHAR(length=120),
               existing_nullable=True)

    # ### end Alembic commands ###
