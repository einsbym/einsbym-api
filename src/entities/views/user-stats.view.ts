import { Field, Int, ObjectType } from '@nestjs/graphql';
import { ViewEntity, ViewColumn } from 'typeorm';

@ObjectType()
@ViewEntity({
    expression: `
    SELECT
      u.username,
      COUNT(DISTINCT p.id) as total_posts,
      COUNT(DISTINCT f.id) as total_files,
      COUNT(DISTINCT pc.id) as total_comments,
      COUNT(DISTINCT pl.*) as total_likes
    FROM
      "user" u
    LEFT JOIN post p ON u.id = p.user_id
    LEFT JOIN file f ON p.id = f.post_id
    LEFT JOIN post_comment pc ON u.id = pc.user_id
    LEFT JOIN post_like pl ON u.id = pl.user_id
    GROUP BY
      u.username
 `,
})
export class UserStatsView {
    @Field()
    @ViewColumn()
    username: string;

    @Field(() => Int)
    @ViewColumn({ name: 'total_posts' })
    totalPosts: number;

    @Field(() => Int)
    @ViewColumn({ name: 'total_files' })
    totalFiles: number;

    @Field(() => Int)
    @ViewColumn({ name: 'total_comments' })
    totalComments: number;

    @Field(() => Int)
    @ViewColumn({ name: 'total_likes' })
    totalLikes: number;
}
