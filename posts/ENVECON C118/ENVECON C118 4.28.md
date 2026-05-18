> [!NOTE] Warm-Ups
> ## Warm-up 1
> ![[image-243.png]]
> 
> Answer: **3**
> In RD, we only care about the jump at the cutoff, not the global fit. A high-order polynomial overfits noise far from the cutoff, causing the curve to behave erratically near the cutoff and potentially fabricating a discontinuity that doesn't exist. This is a bias-inducing distortion specific to RD, not just a simple variance increase.
> 
> ---
> ## Warm-up 2
> ![[image-244.png]]
> 
> Answer: **2**
> Halving the bandwidth reduces bias because the linear fit only uses observations close to the cutoff, better approximating the true CEF locally and avoiding misspecification from faraway data points. However, it increases variance because the smaller sample size makes the estimate more sensitive to individual data points.

In a **sharp** RD, treatment is deterministic in the running variable: 
$$D_i = 1[R_i \ge c]$$

The probability of treatment jumps from 0 to 1 at $c$. But in many real settings, crossing the cutoff *changes the probability* of treatment without <u>fully determining it</u>.

---
# Fuzzy RD

The basic idea is very similar to Instrumental Variables
- We estimate the effect of being above the threshold on the outcome
- Then divide this by the effect on the treatment (i.e. the change in the treatment probability)
Under certain conditions, this will identify the **LATE** at the cutoff.

> [!EXAMPLE] Examples of Fuzzy RD
> - **Admissions Cutoffs**: scoring above a threshold makes you *eligible*, but not everyone accepts the offer.
> - **Scholarship Programs**: the cutoff triggers an offer, but take-up is imperfect.
> - **Medicare at 65**: most people enroll, but not everyone.
> - **Class Size Rules (Angrist & Lavy, 1999)**: Rule caps class size, but schools don't always comply.

---

## Formalizing Fuzzy RD

- Let $p(r) = Pr(D_i = 1|R_i = r)$
- In **sharp** RD: $p(r)$ jumps from $0$ to $1$ at $c$
- In **fuzzy** RD: $p(r)$ has a *jump* at $c$, but doesn't reach the extremes
$$ \lim_{r\downarrow c}p(r) - \lim_{r\uparrow c}p(r) = \pi \in (0, 1)$$
- Call $\pi$ the **first-stage** jump: the increase in treatment probability at the cutoff

![[image-245.png|668]]

In fuzzy RD, crossing the cutoff *induces* treatment for some but not all units. This is exactly the **instrumental variables** setup! 
- "Instrument" $Z_i = 1[R_i \ge c]$ 
- "First Stage": jump in $D_i$ at the cutoff
- "Reduced form": jump in $Y_i$ at the cutoff

> [!IMPORTANT] The Fuzzy RD Estimator
> The fuzzy RD estimand is the **ratio** of the two jumps:
> $$
> \tau_{FRD} = \frac{\lim_{r \downarrow c}E[Y_i|R_i = r] - \lim_{r \uparrow c}E[Y_i|R_i = r]}{\lim_{r \downarrow c}\text{Pr}(D_i = 1|R_i = r) - \lim_{r \uparrow c}\text{Pr}(D_i = 1|R_i = r)}
> $$
> - Numerator: jump in the outcome (reduced form)
> - Denominator: jump in treatment (first stage)
> 
> **Exactly IV Formula**


> [!QUESTION] What does Fuzzy RD Identify?
> Under continuity + a local *monotonicity* assumption, fuzzy RD identifies **LATE at the cutoff**:
> $$ \tau_{FRD} = E[Y_i(1) - Y_i(0)|R_i = c] $$
> - "Compliers" = units whose treatment status would flip if they moved across the cutoff
> - Even *narrower* estimand than sharp RD
> 	- specific subgroup at specific point

---

### Continuity Is Untestable

We can't directly test the continuity of $E[Y_i(d) |R_i = r]$ 
- those are *potential* outcomes
- same issue as all of our causal tools

But we can look for **symptions** of violation

1. Does the **density** of $R_i$ jump at the cutoff? (manipulation)
2. Do **pre-treatment covariates** jump at the cutoff? (imbalance)
3. Is the jump sensitive to **bandwidth and specification**?


#### Test 1: Manipulation of the Running Variable

If people can <u>choose</u> which side of the cutoff they end up on we have selection on unobservable issues again.

- A common signature: **bunching** just above (or below) the cutoff
- *McCrary (2008) density test*: plot the density of $R_i$ near $c$ and test for a discontinuity
	- if nobody can manipulate $R_i$, the density should be smooth through $c$ 
	- A visible spike or gap at $c$ is a red flag

![[image-247.png|643]]
#### Test 2: Covariate Balance

- If treatement is as-good-as-random at the cutoff, then *pre-treatment covariates* should not jump at $c$
- Run the same RD regression with a pre-treatment covariate as the outcome
	- e.g. in Carpenter & Dobkin (2009): does gender or race jump at age 21? Of course not.
	- e.g. in a test-score RD: do students' prior grades jump at the cutoff?
- A discontinuity in a **covariate that shouldn't be affected by treatment** is evidence against continuity


#### Test 3: Placebo Cutoffs

- Pick a cutoff $\tilde{c} \neq c$ where **no policy** changes
- Run the same RD design at $\tilde c$ 
- If you find a large "effect" at a fake cutoff, it's evidence that the jump at $c$ could be an artifact of functional form not a true discontinuity
- Alternatively: check the other birthdays (20, 22) in the MLDA application don't show the jump as 21

#### Test 4: Bandwidth and Specification Sensitivity

Does the estimate survive if you: 
- Halve or double the bandwidth?
- Switch from local linear to local quadratic? 

Best practice: report a table or figure showing $\hat \tau$ across a range of reasonable choices.
**Untestable** estimates across specifications are a warning sign.


