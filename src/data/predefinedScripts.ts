import type { Script } from '@/types/teleprompter.types'

export const CUSTOM_SCRIPT_ID = 'custom'

export const PREDEFINED_SCRIPTS: readonly Script[] = [
  {
    id: 'tell-me-about-yourself',
    title: 'Tell Me About Yourself',
    content: `Thanks for having me today. I'm a software engineer with about seven years of experience, most of it focused on building web applications that scale — both in traffic and in team size.

Right now I work on the platform team at a fintech company, where I lead the frontend architecture for our customer dashboard. Over the last year I drove a migration from a legacy monolith to a modular React and TypeScript codebase, which cut our build times by more than half and let four teams ship independently.

Before that, I spent three years at a startup where I wore a lot of hats: designing APIs, setting up our CI pipeline, and mentoring two junior developers who are now leading projects of their own.

What I enjoy most is the intersection between clean architecture and real user impact. I like making systems simple enough that the next engineer can understand them in an afternoon.

I'm looking for a role where I can keep growing as a technical leader, work on problems with meaningful scale, and contribute to a strong engineering culture. That's exactly why this position caught my attention.`,
  },
  {
    id: 'system-design-walkthrough',
    title: 'System Design Walkthrough',
    content: `Before jumping into components, I'd like to clarify the requirements so we design the right system.

For functional requirements, I'm assuming users can create short links, get redirected when they visit them, and optionally see basic click analytics. For non-functional requirements, redirects should be fast — ideally under fifty milliseconds — highly available, and the system should handle a read-heavy load, roughly one hundred reads for every write.

Let me estimate the scale. If we create ten million links per month, that's about four writes per second on average, and around four hundred reads per second, with peaks maybe ten times higher. Storage over five years stays well under a terabyte.

At a high level, I'd put a load balancer in front of a stateless API service. Writes generate a unique key — I'd use a base sixty-two encoding of an ID from a distributed counter to avoid collisions — and store the mapping in a key-value database.

For reads, a cache like Redis sits in front of the database. Since the access pattern is heavily skewed toward popular links, a cache hit rate above ninety percent is realistic.

Analytics shouldn't slow down redirects, so click events go to a queue and are processed asynchronously.

Finally, I'd talk about trade-offs: consistency versus availability, cache invalidation for deleted links, and rate limiting to prevent abuse. Which of these would you like me to go deeper on?`,
  },
  {
    id: 'behavioral-star',
    title: 'Behavioral Answer (STAR)',
    content: `I'd like to share a time I had to resolve a disagreement within my team.

Situation: We were two weeks away from a major release, and two senior engineers strongly disagreed about how to handle state management in a new feature. The discussion was stalling code reviews and the team was getting frustrated.

Task: As the tech lead, my job was to unblock the team without simply imposing a decision, because I wanted both engineers to stay invested in the outcome.

Action: First, I met with each of them separately to understand their concerns, not just their proposals. It turned out one was worried about performance and the other about long-term maintainability. Then I organized a short session where we wrote down the evaluation criteria together before looking at any solution. We built two small prototypes in a single afternoon and measured them against those criteria.

Result: The data made the decision clear, and both engineers agreed with it. We shipped on time, and the pattern we chose became our team standard. More importantly, we adopted that "criteria first" approach for future technical debates, which noticeably reduced friction in our reviews.

What I learned is that most technical conflicts are really about unspoken priorities. Making them explicit early saves a lot of time.`,
  },
  {
    id: 'questions-for-interviewer',
    title: 'Questions for the Interviewer',
    content: `Thank you, I do have a few questions.

First, what does success look like for this role in the first ninety days? I'd like to understand what you'd expect me to have delivered or learned by then.

Second, how does the team make technical decisions? For example, is there a design review process, and how are disagreements usually resolved?

Third, what's the biggest technical challenge the team is facing right now, and what's standing in the way of solving it?

I'm also curious about how you balance shipping new features with paying down technical debt. Is there dedicated time for that, or is it handled case by case?

Regarding growth, how do engineers here typically progress, and what kind of mentorship or learning opportunities are available?

And finally, what do you personally enjoy most about working on this team?

Thanks again for your time. I've really enjoyed this conversation, and I'm excited about the possibility of joining the team.`,
  },
  {
    id: CUSTOM_SCRIPT_ID,
    title: 'Custom script',
    content: '',
    isCustom: true,
  },
]
