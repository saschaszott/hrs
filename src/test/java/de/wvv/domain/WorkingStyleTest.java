package de.wvv.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import de.wvv.web.rest.TestUtil;

public class WorkingStyleTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(WorkingStyle.class);
        WorkingStyle workingStyle1 = new WorkingStyle();
        workingStyle1.setId(1L);
        WorkingStyle workingStyle2 = new WorkingStyle();
        workingStyle2.setId(workingStyle1.getId());
        assertThat(workingStyle1).isEqualTo(workingStyle2);
        workingStyle2.setId(2L);
        assertThat(workingStyle1).isNotEqualTo(workingStyle2);
        workingStyle1.setId(null);
        assertThat(workingStyle1).isNotEqualTo(workingStyle2);
    }
}
