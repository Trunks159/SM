"""empty message

Revision ID: c7fcb67d2994
Revises: 424cccf3cb88
Create Date: 2023-02-16 16:54:12.059562

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'c7fcb67d2994'
down_revision = '424cccf3cb88'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('request_off', sa.Column('date', sa.DateTime(), nullable=True))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('request_off', 'date')
    # ### end Alembic commands ###