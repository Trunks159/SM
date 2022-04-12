"""empty message

Revision ID: 8c2bac8ca794
Revises: f6f83406e962
Create Date: 2022-04-11 20:34:10.948385

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '8c2bac8ca794'
down_revision = 'f6f83406e962'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('week_schedule',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('week_schedule')
    # ### end Alembic commands ###
