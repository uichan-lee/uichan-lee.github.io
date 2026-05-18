## Review: Continuity Assumption

- The continuity assumption is a statement about *potential outcomes* at the cutoff.
- The potential outcome function can slope, curve, or trend however they like
- What they can't do is <u>jump at c</u> on their own 

Two Ways Continuity Fails:
1. Something else change at the same cutoff
	- A second policy turns on at $c$
	- A behavioral change for unrelated reasons
	- We can't attribute the jump to our treatment alone
2. Units can manipulate the running variable
	- If people sort onto one side of c, units just above and just below differ systematically
	- Tested via the *density of* $R_i$ at $c$

# Estimating RD in Practice

Last time we showed that under continuity:
$$
\tau_{RD} = \lim_{r\downarrow c}E[Y_i|R_r=r] - \lim_{r\uparrow c}E[Y_i|R_r=r] = E[Y_i(1) - Y_i(0)|R_i=r]
$$
Practical problem: we never actually observe units at $R_i = c$
Basic Idea: Fit a line on each side of the cutoff, then read off the gap at $c$

- $E[Y_i|R_i=r] \approx \alpha_0 + \alpha_1 r$ if $r < c$
- $E[Y_i|R_i=r] \approx \beta_0 + \beta_1 r$ if $r \ge c$

Then under the RD assumptions
$$
CATE = \lim_{r\downarrow c}E[Y_i|R_r=r] - \lim_{r\uparrow c}E[Y_i|R_r=r] \approx (\beta_0 + \beta_1 c) - (\alpha_0 + \alpha_1 c)
$$

- We can estimate these regression coefficients via OLS to estimate the effect of the treatment
- To simplify things, we can normalize $c = 0$ (without loss of generality)
- Instead of running two separate regressions and subtracting, stack both sides into *one regression*

## The Stacked Regression

Consider the single regression:
$$
Y_i = \gamma_0 + \tau D_i + \gamma_1 R_i + \delta D_i R_i + \epsilon_i
$$
- $D_i = 1[R_i \ge 0]$
- Four coefficients, but each one has an interpretation


**Below the cutoff**, $D_i = 0$ so the regression becomes:
$$
Y_i = \gamma_0 + \gamma_1 R_i + \epsilon_i
$$
Taking the conditional expectation:
$$
E[Y_i|R_i=r] = \gamma_0 + \gamma_1 r
$$
**Above the cutoff**, $D_i = 1$ so:
$$
Y_i = (\gamma_0 + \tau) + (\gamma_1 + \delta)R_i + \epsilon_i
$$
Taking the conditional expectation:
$$
E[Y_i|R_i = r] = (\gamma_0 + \tau) + (\gamma_1 + \delta)r
$$

**Reading Off the CATE**:
Evaluate both limits at the cutoff $c = 0$:
![[image-242.png]]
The jump at the cutoff:
$$
CATE = (\gamma_0 + \tau) - \gamma_0 = \tau
$$


